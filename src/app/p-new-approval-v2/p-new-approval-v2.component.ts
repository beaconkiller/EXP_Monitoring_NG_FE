import { Component } from '@angular/core';
import { HItemPengajuanComponent } from '../h-item-pengajuan/h-item-pengajuan.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FPembelianMateraiComponent } from '../f-pembelian-materai/f-pembelian-materai.component';
import { FBiayaOperasionalComponent } from '../f-biaya-operasional/f-biaya-operasional.component';

@Component({
    selector: 'app-p-new-approval-v2',
    imports: [
        HItemPengajuanComponent,
        FPembelianMateraiComponent,
        FBiayaOperasionalComponent,
        CommonModule,
        FormsModule,
    ],
    templateUrl: './p-new-approval-v2.component.html',
    styleUrl: './p-new-approval-v2.component.css'
})
export class PNewApprovalV2Component {

  act_pengajuan_type = 'Biaya Pembelian Materai'

  arr_pengajuan_type = [
    { pengajuan_name: 'Biaya Operasional' },
    { pengajuan_name: 'Biaya Pembelian Materai' },
    { pengajuan_name: 'Biaya Token Listrik' },
    { pengajuan_name: 'MI Persetujuan Klaim Asuransi' },
    { pengajuan_name: 'MI Pengembalian Klaim Asuransi' },
    { pengajuan_name: 'Pengajuan Penjualan UTN' },
    { pengajuan_name: 'Pengajuan Persetujuan Sewa Ruko' },
  ]

}
