import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navleft-v2',
    imports: [RouterModule, CommonModule],
  templateUrl: './navleft-v2.component.html',
  styleUrl: './navleft-v2.component.css'
})
export class NavleftV2Component {
  menuItems =
    [
      // { name: 'Home', route: 'home' },
      { name: 'Request Pengajuan', route: 'new-approval' },
      { name: 'Request Memo Internal', route: 'pengajuan-mi' },
      { name: 'Info Pengajuan', route: 'info-pengajuan' },
      { name: 'Approve Pengajuan', route: 'approve-pengajuan' },
      { name: 'Histori Pengajuan', route: 'cek-pengajuan' },
      // { name: 'Revisi Pengajuan', route: 'revisi-pengajuan' },
      { name: 'Suppliers', route: 'suppliers' },
      { name: 'Jenis Pembiayaan', route: 'jenis_pembayaran' },
    ]


    ngOnInit(){
      this.buildmenu();
    }

    buildmenu(){
      console.log('\n ============== buildmenu ============== \n')

      var menuStr = localStorage.getItem('menuData');

      console.log(menuStr); 
    }
}
