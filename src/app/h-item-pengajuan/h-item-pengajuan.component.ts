import { Component, ComponentRef, ViewChild, viewChild, ViewContainerRef } from '@angular/core';
import { CItemPengajuanComponent } from '../c-item-pengajuan/c-item-pengajuan.component';
import { FormsModule, NgSelectOption } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDragDrop, CdkDropList, DragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { config } from '../../config/config';
import { lastValueFrom } from 'rxjs';
import { get_user_code, get_user_detail } from '../shared/utils_general';
import { CApprovalItemComponent } from "./c-approval-item/c-approval-item.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select'
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';
import { CSignaturePadComponent } from '../p-request-dtl/c-signature-pad/c-signature-pad.component';



@Component({
  selector: 'app-h-item-pengajuan',
  imports: [
    CItemPengajuanComponent, 
    CApprovalItemComponent,
    FormsModule, 
    CommonModule, 
    CdkDropList, 
    CdkDrag, 
    HttpClientModule, 
    CApprovalItemComponent,
    NgSelectModule,
    NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    NgSelectComponent,
    CSignaturePadComponent,
  ],
  standalone: true,
  templateUrl: './h-item-pengajuan.component.html',
  styleUrl: './h-item-pengajuan.component.css'
})
export class HItemPengajuanComponent {
  constructor(private http: HttpClient, private snackbar:MatSnackBar, private router:Router) { };

  arr_rek_data = [];
  

  arr_request_type = [
    {
      NAME_TYPE : ''
    }
  ];
  act_pengajuan = this.arr_request_type[0]['NAME_TYPE'];


  arr_pajak = [
      { pajak_type: '-', pajak_code: '0' },
      { pajak_type: 'PPH', pajak_code: '1' },
      { pajak_type: 'PPN', pajak_code: '2' },
  ];

  act_divisi = {
    EMPL_JOB : null as String | null,
    EMPL_JOB_NAME : null as String | null,
  }

  user_cabang:any

  act_file = {
    file_name : null as String | null,
    file_base64 : null as String | null,
  };

  arr_tipe_pajak = [
    { pajak_type: '-', pajak_code: '0' },
    { pajak_type: 'PPH', pajak_code: '1' },
    { pajak_type: 'PPN', pajak_code: '2' },
  ]




  arr_files = [];

  items = [
    {
      KETERANGAN: "",
      HARGA_SATUAN: 0,
      QTY: 0,
      PAJAK_TYPE: '-',
      PAJAK_AMOUNT: null as String | number | null,
      TOTAL_HARGA: 0,
      JENIS_PEMBIAYAAN: null as String | null,
      NO_REK : null as String | null,
      NAMA_REK : null as String | null,
      BANK_NAME : null as String | null,
      unf_rek: null as String | null,
      FILE_NAME: null as String | null,
      FILE_: null as File | String | null,
      bind_calc: false,
    },
  ];

  arr_kom_type = [
    { POSISION: 'APPROVE' },
    { POSISION: 'CEK' },
  ]

  items_kom_approve = [
    {
      EMPL_NAME: null as String | null,
      EMPL_CODE: null as String | null,
      POSISION: null as String | null,
      LVL: null as number | String | null,
    },
  ];

  arr_office = [
    { office_name: 'Grogol', office_code: '903' },
    { office_name: 'Depok', office_code: '904' },
    { office_name: 'Jakpus', office_code: '911' },
    { office_name: 'Cikupa', office_code: '929' },
  ]

  str_info_pengajuan:any = '';
  act_office:any = this.arr_office[0]['office_code'];
  is_fetching:boolean = false;
  base64_sig_data:any = null;


  ngOnInit() {
    this.initLoad();
  }


  init_fetch() {
    // console.log('asdasd');
  }


  addItem() {
    this.items.push({
      KETERANGAN: "",
      HARGA_SATUAN: 0,
      QTY: 0,
      PAJAK_TYPE: '-',
      PAJAK_AMOUNT: null,
      TOTAL_HARGA: 0,
      unf_rek: null,
      NO_REK : null as String | null,
      NAMA_REK : null as String | null,
      BANK_NAME : null as String | null,
      JENIS_PEMBIAYAAN: this.arr_request_type[0].NAME_TYPE,
      FILE_NAME: null,
      FILE_: null,
      bind_calc:false,
    });
  }


  removeItem(i: number) {
    this.items.splice(i, 1);
  }


  bankChanged(e: any) {
    let val = e.target.value;
    let bank_name = e.target.text;
  }


  addKomite() {
    this.items_kom_approve.push(
      {
        EMPL_NAME: null as String | null,
        EMPL_CODE: null as String | null,
        POSISION: null as String | null,
        LVL: null as number | String | null,  
      },
    )
  }


  removeKomite(i: number) {
    this.items_kom_approve.splice(i, 1);
  }


  get_kom_appr_detail(e: any) {
    const kom_appr_code = e.target.value;

    // console.log(kom_appr_code);
  }


  trackByFn(index: number, item: any): number {
    return item.LVL;
  }







  // get sortedItems() {
  //   return this.items_kom_approve.sort((a, b) => a.LVL - b.LVL);
  // }

  private swapOrder(index1: number, index2: number) {
    const tempOrder = this.items_kom_approve[index1].LVL;
    this.items_kom_approve[index1].LVL = this.items_kom_approve[index2].LVL;
    this.items_kom_approve[index2].LVL = tempOrder;
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items_kom_approve, event.previousIndex, event.currentIndex);
  }






  // ===============================================================
  // ========================== INIT LOAD ===========================
  // ===============================================================
  
  async initLoad(){
    // console.log('initLoad')
    await this.get_rekening();
    await this.get_request_type();
    this.setInit();
  }

  async get_rekening(){
    // console.log('get_rekening');

    let queryParams = {
      data:'test',
    }

    var xRes:any = await lastValueFrom(this.http.get(config.env_dev.host + '/api/get_rekening',{params:queryParams}));
    this.arr_rek_data = xRes.data;    
    // console.log(this.arr_rek_data);

  }

  async get_request_type(){
    // console.log('get_request_type');

    let queryParams = {
      data:'test',
    }

    var xRes:any = await lastValueFrom(this.http.get(config.env_dev.host + '/api/get_request_type',{params:queryParams}));
    this.arr_request_type = xRes.data; 

    // console.log(xRes);

    // if (this.arr_request_type.length > 0) {
    //   this.act_pengajuan = this.arr_request_type[0]['NAME_TYPE'];
    // }
  }


  setInit(){
    this.items = [
      {
        KETERANGAN: "",
        HARGA_SATUAN: 0,
        QTY: 0,
        PAJAK_TYPE: '-',
        PAJAK_AMOUNT: null,
        TOTAL_HARGA: 0,
        unf_rek: "",
        NO_REK : null as String | null,
        NAMA_REK : null as String | null,
        BANK_NAME : null as String | null,  
        JENIS_PEMBIAYAAN: this.arr_request_type[0].NAME_TYPE,
        bind_calc:false,
        FILE_NAME: null,
        FILE_: null,
      },
    ];

    this.act_divisi = {
      EMPL_JOB : get_user_detail()['EMPL_JOB'],
      EMPL_JOB_NAME : get_user_detail()['JOB_DESCRIPTION'],
    }

    this.user_cabang = get_user_detail()['NAME_FULL']
  }



  // ===============================================================
  // ========================== INPUTS ===========================
  // ===============================================================


  on_rek_changed(event:Event, index:any){
    const val = event;
    let cur_item = this.items[index]

    if(val){
      cur_item['unf_rek'] = val.toString(); 
    }else{
      cur_item['unf_rek'] = null;
    }

    console.log(this.items);
  }


  on_type_pengajuan_changed(event:Event){
    console.log()
  }


  on_pajak_changed(event:Event, i:any){
    var val = (event.target as HTMLInputElement).value    
    this.items[i]['PAJAK_TYPE'] = val;
    this.items[i]['PAJAK_AMOUNT'] = null;
    this.getTotalHarga(i)
  }


  remove_appr_person(v:any){
    this.items_kom_approve.splice(v,1);
  }


  lockThis(i:any){
    console.log(i);
    this.items[i]['bind_calc'] = !this.items[i]['bind_calc'];

    if(this.items[i]['bind_calc']){
      this.getTotalHarga(i)
    }else{
      this.items[i]['TOTAL_HARGA'] = 0
    }
  }

  change_sig_data(e:Event){
    this.base64_sig_data = e
  }

  // ===============================================================
  // ========================== FILE UPLOADING ===========================
  // ===============================================================


  chooseFile(e: any, i: any) {
    let src = (e.target as HTMLElement).parentElement
    let inp = (src?.querySelector('.inputFile') as HTMLElement)

    var inpFile = document.createElement("input");
    inpFile.setAttribute('type', 'file');
    inpFile.click();

    inpFile.onchange = (event) => {
      let files = (event.target as HTMLInputElement).files

      if (files) {
        let file = files[0];
        this.items[i]["FILE_NAME"] = files[0].name

        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          this.items[i]["FILE_"] = base64String;
        }

        reader.readAsDataURL(file);

      }
    }
  }


  chooseFile_v2(e: any) {
    let src = (e.target as HTMLElement).parentElement
    let inp = (src?.querySelector('.inputFile') as HTMLElement)

    var inpFile = document.createElement("input");
    inpFile.setAttribute('type', 'file');
    inpFile.setAttribute("accept", ".pdf, .jpeg, .jpeg, .png");
    inpFile.click();

    inpFile.onchange = (event) => {
      let files = (event.target as HTMLInputElement).files

      if (files) {
        let file = files[0];

        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          this.act_file = {
            file_name : files[0].name,
            file_base64 : base64String
          }

          this.items.forEach((el)=>{
            el.FILE_NAME = files[0].name
          })
        }

        reader.readAsDataURL(file);
      }
    }
  }


  clear_file(){
    this.act_file.file_base64 = null;
    this.act_file.file_name = null;
  }


  rm_file(i: any) {
    this.items[i]["FILE_"] = null;
    this.items[i]["FILE_NAME"] = null;
  }



  // ===============================================================
  // ========================== RESPONSE ===========================
  // ===============================================================

  notif_str: String = '';



  // ===============================================================
  // ===================== FILTERING THE DATA =======================
  // ===============================================================


  filter_kom_approve() {
    let arr_send = [ ...this.items_kom_approve ];

    console.log(arr_send);

    let i = 1;
    for(let el of arr_send){
      el['LVL'] = i;
      i++;
      console.log(el)
    };

    return arr_send;
  }


  allow_send_pengajuan() {
    // console.log('allow_send_pengajuan');
    // this.notif_str = '';

    // ------------ ITEMS DETECT ------------

    for (let el of this.items) {
      if (el.KETERANGAN == '' || el.HARGA_SATUAN == 0 || el.QTY == 0) {
        let notif_str = 'Data pengajuan belum lengkap.';
        this.snackbar.open(notif_str, undefined, {
          duration: 5000,
          panelClass: ['notif_failed']
        })
        return false;
      }
    };

    // ------------ KOM APPROVE DETECT ------------

    for(let el of this.items_kom_approve){
      if(el['EMPL_CODE'] == null){
        let notif_str = 'Silahkan cek kembali komite approval.';
        this.snackbar.open(notif_str, undefined, {
          duration: 5000,
          panelClass: ['notif_failed']
        })
        return false
      }    
    }

    // ------------ KOM APPROVE DETECT ------------

    if(this.base64_sig_data == null){
      let notif_str = 'Silahkan cek kembali tanda tangan pembuat.';
      this.snackbar.open(notif_str, undefined, {
        duration: 5000,
        panelClass: ['notif_failed']
      })
      return false;
    }

    return true;
  }


  filter_rek(){
    // (3) ['BCA', 'Aldi', '1231231010']

    this.items.forEach(el => {
      let str_rek = el['unf_rek'] 
      let arr_rek = str_rek?.split(' - ')

      el['NO_REK'] =  arr_rek![2].toString()
      el['BANK_NAME'] =  arr_rek![0].toString()
      el['NAMA_REK'] =  arr_rek![1].toString()

    })
  }




  // =======================================================
  // =================== SENDING THE JSON =====================
  // =======================================================


  async savePengajuan() {
    this.is_fetching = true;
    let xRes: any;

    
    if (!this.allow_send_pengajuan()) {
      this.is_fetching = false;
      return false;
    }

    var ordered_array = this.filter_kom_approve();
    this.filter_rek();

    try {      
      let queryParams = {
        user_data: {
          empl_code: get_user_code(),
          office_code: this.act_office,
          pengajuan_type: this.str_info_pengajuan,
          selected_file : this.act_file
        },
        data: { pengajuan: this.items, komite_approve: ordered_array },
        file_data: this.act_file
      }
  
      xRes = await lastValueFrom(this.http.post(config.env_dev.host + '/api/new_pengajuan', queryParams));
      console.log(xRes);

      // ----- NOTIF -----
      this.snackbar.open(xRes.message, undefined, {
        duration: 5000,
        panelClass: ['notif_neutral']
      })

    } catch (error) {
      console.log(error)
    }


    await new Promise<void>((resolve, reject) => {      
      setTimeout(() => {
        this.router.navigate(['/cek-pengajuan']);
        resolve()
      }, 3000);
    }) 


    this.is_fetching=false;
    return true;
  }




  // ===============================================
  // =================== UTILS =====================
  // ===============================================




  getTotal() {
    let total: number = 0;
    for (var el of this.items) {
      total = total + Number(el['TOTAL_HARGA']);
    }

    return total;
  }


  getTotalHarga(i: any) {
    if(this.items[i]['bind_calc']){
      let act_item = this.items[i];
      let qty = act_item.QTY;
      let hrg_satuan = act_item.HARGA_SATUAN;
  
      if(act_item['PAJAK_AMOUNT'] != null){
        act_item.TOTAL_HARGA = (qty * hrg_satuan) + ((qty * hrg_satuan) * (Number(act_item['PAJAK_AMOUNT'])/100));
      }else{
        act_item.TOTAL_HARGA = (qty * hrg_satuan);
      }
    }
    // act_item.TOTAL_HARGA = qty * hrg_satuan;
  }

  debug_(){
    console.log()
  }
}
