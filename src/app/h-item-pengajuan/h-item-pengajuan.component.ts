import { Component, ComponentRef, ViewChild, viewChild, ViewContainerRef } from '@angular/core';
import { CItemPengajuanComponent } from '../c-item-pengajuan/c-item-pengajuan.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDragDrop, CdkDropList, DragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { config } from '../../config/config';
import { lastValueFrom } from 'rxjs';
import { get_user_code } from '../shared/utils_general';



@Component({
  selector: 'app-h-item-pengajuan',
  imports: [CItemPengajuanComponent, FormsModule, CommonModule, CdkDropList, CdkDrag, HttpClientModule],
  standalone: true,
  templateUrl: './h-item-pengajuan.component.html',
  styleUrl: './h-item-pengajuan.component.css'
})
export class HItemPengajuanComponent {
  constructor(private http: HttpClient) { };

  arr_rek_data = [
    {
      REK_NAME : '',
      BANK_NAME : '',
      REK_NUM : '',
    }
  ];
  

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
  // act_ = this.arr_pajak[0]['NAME_TYPE'];
  

  arr_divisi = [
    {
      divisi_name : ''
    }
  ];
  // act_pengajuan = this.arr_request_type[0]['NAME_TYPE'];

  act_file = {
    file_name : null as String | null,
    file_base64 : null as String | null,
  };


  arr_tipe_pajak = [
    { pajak_type: '-', pajak_code: '0' },
    { pajak_type: 'PPH', pajak_code: '1' },
    { pajak_type: 'PPN', pajak_code: '2' },
  ]


  arr_komite_appr = [
    { empl_name: 'Abdul Gofur', empl_code: '71002937', office_code: '903', office_name: 'Grogol', function_name: 'Dept Head' },
    { empl_name: 'Aldi Andre', empl_code: '71008462', office_code: '904', office_name: 'Depok', function_name: 'Div Head' },
    { empl_name: 'Saturnus', empl_code: '71005837', office_code: '911', office_name: 'Jakpus', function_name: 'Supervisor' },
    { empl_name: 'Thiago Silva', empl_code: '71005837', office_code: '903', office_name: 'Cikupa', function_name: 'Dept Head' },
  ]

  arr_pembiayaan = [
    { jenis_pembiayaan: 'RUTIN BULANAN' },
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
      NO_REK: null as String | null,
      NAMA_REK: null as String | null,
      BANK_NAME: null as String  | null,
      JENIS_PEMBIAYAAN: null as String | null,
      FILE_NAME: null as String | null,
      FILE_: null as File | String | null,
    },
  ];

  arr_kom_type = [
    { POSISION: 'APPROVE' },
    { POSISION: 'CEK' },
  ]

  items_kom_approve = [
    {
      empl_name: 'Abdul Gofur',
      EMPL_CODE: '71002937',
      office_code: '903',
      office_name: 'Grogol',
      function_name: 'Batman',
      POSISION: 'APPROVE',
      LVL: 0,
    },
  ];

  arr_office = [
    { office_name: 'Grogol', office_code: '903' },
    { office_name: 'Depok', office_code: '904' },
    { office_name: 'Jakpus', office_code: '911' },
    { office_name: 'Cikupa', office_code: '929' },
  ]

  act_office = this.arr_office[0]['office_code'];
  is_fetching = false;


  ngOnInit() {
    this.initLoad();
  }


  init_fetch() {
    console.log('asdasd');
  }


  addItem() {
    this.items.push({
      KETERANGAN: "",
      HARGA_SATUAN: 0,
      QTY: 0,
      PAJAK_TYPE: '-',
      PAJAK_AMOUNT: null,
      TOTAL_HARGA: 0,
      NO_REK: this.arr_rek_data[0].REK_NUM,
      BANK_NAME: this.arr_rek_data[0].BANK_NAME,
      NAMA_REK: this.arr_rek_data[0].REK_NAME,
      JENIS_PEMBIAYAAN: this.arr_request_type[0].NAME_TYPE,
      FILE_NAME: null,
      FILE_: null,
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
        empl_name: 'Abdul Gofur',
        EMPL_CODE: '71002937',
        office_code: '903',
        office_name: 'Grogol',
        function_name: 'Batman',
        POSISION: 'APPROVE',
        LVL: 0
      },
    )
  }


  removeKomite(i: number) {
    this.items_kom_approve.splice(i, 1);
  }


  get_kom_appr_detail(e: any) {
    const kom_appr_code = e.target.value;

    console.log(kom_appr_code);
  }


  trackByFn(index: number, item: any): number {
    return item.LVL;
  }







  get sortedItems() {
    return this.items_kom_approve.sort((a, b) => a.LVL - b.LVL);
  }

  private swapOrder(index1: number, index2: number) {
    const tempOrder = this.items_kom_approve[index1].LVL;
    this.items_kom_approve[index1].LVL = this.items_kom_approve[index2].LVL;
    this.items_kom_approve[index2].LVL = tempOrder;
  }




  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items_kom_approve, event.previousIndex, event.currentIndex);
  }



  get_kom_detail(val: any) {
    const empl_code = val;

    let kom = this.arr_komite_appr.find(item => item.empl_code == val)
    return kom;
  }





  // ===============================================================
  // ========================== INIT LOAD ===========================
  // ===============================================================
  
  async initLoad(){
    console.log('initLoad')
    await this.get_rekening();
    await this.get_request_type();
    this.setInit();
  }

  async get_rekening(){
    console.log('get_rekening');

    let queryParams = {
      data:'test',
    }

    var xRes:any = await lastValueFrom(this.http.get(config.env_dev.host + '/api/get_rekening',{params:queryParams}));
    this.arr_rek_data = xRes.data;    
    console.log(this.arr_rek_data);

  }

  async get_request_type(){
    console.log('get_request_type');

    let queryParams = {
      data:'test',
    }

    var xRes:any = await lastValueFrom(this.http.get(config.env_dev.host + '/api/get_request_type',{params:queryParams}));
    this.arr_request_type = xRes.data; 

    console.log(xRes);

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
        NO_REK: this.arr_rek_data[0].REK_NUM,
        BANK_NAME: this.arr_rek_data[0].BANK_NAME,
        NAMA_REK: this.arr_rek_data[0].REK_NAME,
        JENIS_PEMBIAYAAN: this.arr_request_type[0].NAME_TYPE,
        FILE_NAME: null,
        FILE_: null,
      },
    ];
  }



  // ===============================================================
  // ========================== INPUTS ===========================
  // ===============================================================


  on_rek_changed(event:any, index:any){
    const val = (event.target as HTMLSelectElement).value;
    const act_rek = this.arr_rek_data[parseInt(val)];

    
    this.items[index]['NO_REK'] = act_rek['REK_NUM'];
    this.items[index]['NAMA_REK'] = act_rek['REK_NAME'];
    this.items[index]['BANK_NAME'] = act_rek['BANK_NAME'];

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
    let arr_send: { empl_name: string; EMPL_CODE: string; office_code: string; office_name: string; function_name: string; POSISION: string; LVL: number; }[] = [];


    let i = 1;
    this.items_kom_approve.forEach(el => {
      el['LVL'] = i;
      i++;
    });

    console.log(this.items_kom_approve);

    return arr_send;
  }

  allow_send_pengajuan() {
    // console.log('allow_send_pengajuan');
    this.notif_str = '';

    for (let el of this.items) {
      if (el.KETERANGAN == '' || el.NO_REK == '' || el.HARGA_SATUAN == 0 || el.QTY == 0) {
        this.notif_str = 'Data pengajuan belum lengkap.';
        return false;
      }
    };

    return true;
  }





  // =======================================================
  // =================== SENDING THE JSON =====================
  // =======================================================


  async savePengajuan() {
    // console.log(this.items);
    // console.log(this.items_kom_approve);
    console.log(get_user_code())

    this.is_fetching = true;

    let xRes: any;
    
    if (!this.allow_send_pengajuan()) {
      this.is_fetching = false;
      return false;
    }



    let queryParams = {
      user_data: {
        empl_code: get_user_code(),
        office_code: this.act_office,
        pengajuan_type: this.act_pengajuan,
        selected_file : this.act_file
      },
      data: { pengajuan: this.items, komite_approve: this.items_kom_approve },
      file_data: this.act_file
    }

    console.log(queryParams);

    // xRes = await lastValueFrom(this.http.post(config.env_dev.host + '/api/new_pengajuan', queryParams));
    // console.log(xRes);


    this.is_fetching=false;
    
    return this.filter_kom_approve();

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
    // console.log(i);
    let act_item = this.items[i];
    let qty = act_item.QTY;
    let hrg_satuan = act_item.HARGA_SATUAN;

    if(act_item['PAJAK_AMOUNT'] != null){
      act_item.TOTAL_HARGA = (qty * hrg_satuan) + ((qty * hrg_satuan) * (Number(act_item['PAJAK_AMOUNT'])/100));
    }else{
      act_item.TOTAL_HARGA = (qty * hrg_satuan);
    }


    
    // act_item.TOTAL_HARGA = qty * hrg_satuan;

  }


}
