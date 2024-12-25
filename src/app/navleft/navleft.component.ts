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
      { name: 'Cek Pengajuan', route: 'cek-pengajuan' },
      { name: 'Approve Pengajuan', route: 'approve-pengajuan' },
      { name: 'Info Pengajuan', route: 'info-pengajuan' },
      { name: 'Revisi Pengajuan', route: 'revisi-pengajuan' },
      // { name: 'Settings', route: 'user-settings' },
      // { name: 'Settings', route: 'user-settings' },
    ]
}
