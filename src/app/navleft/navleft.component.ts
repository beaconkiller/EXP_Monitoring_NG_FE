import { Component } from '@angular/core';
import { routes } from '../app.routes';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-navleft',
    imports: [RouterModule, CommonModule],
    templateUrl: './navleft.component.html',
    styleUrl: './navleft.component.css'
})
export class NavleftComponent {
  menuItems =
    [
      // { name: 'Home', route: 'home' },
      { name: 'Request Pengajuan', route: 'new-approval' },
      { name: 'Info Pengajuan', route: 'info-pengajuan' },
      { name: 'Approve Pengajuan', route: 'approve-pengajuan' },
      { name: 'Histori Pengajuan', route: 'cek-pengajuan' },
      // { name: 'Revisi Pengajuan', route: 'revisi-pengajuan' },
      { name: 'Suppliers', route: 'suppliers' },
      { name: 'Jenis Pembayaran', route: 'jenis_pembayaran' },
    ]
}
