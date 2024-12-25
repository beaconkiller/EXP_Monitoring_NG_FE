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

  arr_pengajuan_type = [
    { pengajuan_name: 'Biaya Operasional' },
    { pengajuan_name: 'Biaya Pembelian Materai' },
    { pengajuan_name: 'Biaya Token Listrik' },
    { pengajuan_name: 'MI Persetujuan Klaim Asuransi' },
    { pengajuan_name: 'MI Pengembalian Klaim Asuransi' },
    { pengajuan_name: 'Pengajuan Penjualan UTN' },
    { pengajuan_name: 'Pengajuan Persetujuan Sewa Ruko' },
  ];


  arr_bank = [
    { bank_name: 'BCA', bank_code: '0' },
    { bank_name: 'BRI', bank_code: '1' },
    { bank_name: 'BNI', bank_code: '2' },
    { bank_name: 'Bank Sinarmas', bank_code: '3' },
  ]


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
      TOTAL_HARGA: 0,
      NO_REK: "",
      NAMA_REK: "",
      BANK_NAME: this.arr_bank[0].bank_name,
      JENIS_PEMBIAYAAN: "RUTIN BULANAN",
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
  act_pengajuan = this.arr_pengajuan_type[0]['pengajuan_name'];
  is_fetching = false;


  ngOnInit() {

  }


  init_fetch() {
    console.log('asdasd');
  }


  addItem() {
    this.items.push({
      KETERANGAN: "",
      HARGA_SATUAN: 0,
      QTY: 0,
      TOTAL_HARGA: 0,
      NO_REK: "",
      NAMA_REK: "",
      BANK_NAME: this.arr_bank[0].bank_name,
      JENIS_PEMBIAYAAN: "RUTIN BULANAN",
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

    this.is_fetching = true;

    let xRes: any;

    if (!this.allow_send_pengajuan()) {
      this.is_fetching = false;
      return false;
    }


    let queryParams = {
      user_data: {
        empl_code: get_user_code()['empl_code'],
        office_code: this.act_office,
        pengajuan_type: this.act_pengajuan,
      },
      data: { pengajuan: this.items, komite_approve: this.items_kom_approve }
    }

    console.log(queryParams);

    xRes = await lastValueFrom(this.http.post(config.env_dev.host + '/api/new_pengajuan', queryParams));
    console.log(xRes);


    return this.filter_kom_approve();
  }




  // ===============================================
  // =================== UTILS =====================
  // ===============================================



  getTotal() {
    let total: number = 0;
    for (var el of this.items) {
      // console.log(el['jumlah']);
      total = total + Number(el['TOTAL_HARGA']);
    }

    // console.log(total);
    return total;
  }

  getTotalHarga(i: any) {
    // console.log(i);
    let act_item = this.items[i];
    let qty = act_item.QTY;
    let hrg_satuan = act_item.HARGA_SATUAN;

    // console.log(act_item);

    act_item.TOTAL_HARGA = qty * hrg_satuan;

  }


}
