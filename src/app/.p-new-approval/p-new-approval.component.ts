import { Component, ViewChild, viewChild } from '@angular/core';
import { HItemPengajuanComponent } from "../h-item-pengajuan/h-item-pengajuan.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-p-new-approval',
  imports: [HItemPengajuanComponent, CommonModule, FormsModule,],
  standalone: true,
  templateUrl: './p-new-approval.component.html',
  styleUrl: './p-new-approval.component.css'
})
export class PNewApprovalComponent {
  @ViewChild(HItemPengajuanComponent) fillData!: HItemPengajuanComponent;



  arr_pengajuan_type = [
    { pengajuan_name: 'Biaya Operasional' },
    { pengajuan_name: 'Biaya Pembelian Materai' },
    { pengajuan_name: 'Biaya Token Listrik' },
    { pengajuan_name: 'MI Persetujuan Klaim Asuransi' },
    { pengajuan_name: 'MI Pengembalian Klaim Asuransi' },
    { pengajuan_name: 'Pengajuan Penjualan UTN' },
    { pengajuan_name: 'Pengajuan Persetujuan Sewa Ruko' },
  ];

  // act_pengajuan_type = 'Biaya Pembelian Materai'
  act_pengajuan_type = this.arr_pengajuan_type[0]['pengajuan_name'];

  arr_cabang = [
    { office_name: 'Depok', office_code: '904' },
    { office_name: 'Grogol', office_code: '903' },
    { office_name: 'Jakpus', office_code: '911' },
  ]

  act_cabang = this.arr_cabang[0]['office_code'];






  deb() {
    console.log([
      this.fillData.items,
      this.fillData.items_kom_approve,
      // this.act_cabang,
      // this.act_pengajuan_type
    ])

    console.log(this.fillData.items_kom_approve,
    )
  }
}
