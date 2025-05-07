import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-navleft',
    imports: [RouterModule, CommonModule],
    templateUrl: './navleft.component.html',
    styleUrl: './navleft.component.css'
})
export class NavleftComponent {
  is_expanded:boolean = false;


  menuItems =
    [
      // { name: 'Home', route: 'home' },
      { name: 'Request Pengajuan', route: 'new-approval' },
      { name: 'New Memo', route: 'new-memo' },
      { name: 'Info Pengajuan', route: 'info-pengajuan' },
      { name: 'Approve Pengajuan', route: 'approve-pengajuan' },
      { name: 'Histori Pengajuan', route: 'cek-pengajuan' },
      // { name: 'Revisi Pengajuan', route: 'revisi-pengajuan' },
      { name: 'Suppliers', route: 'suppliers' },
      { name: 'Jenis Pembiayaan', route: 'jenis_pembayaran' },
    ]



  f_expand(){
    this.is_expanded = !this.is_expanded;
  }    
  
  f_close_menu(){
    this.is_expanded = true;
  }
}
