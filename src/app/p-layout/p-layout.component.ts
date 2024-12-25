import { Component } from '@angular/core';
import { PNewApprovalComponent } from "../.p-new-approval/p-new-approval.component";
import { NavleftComponent } from "../navleft/navleft.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { CNavtopComponent } from "../c-navtop/c-navtop.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-p-layout',
  imports: [CommonModule, NavleftComponent, RouterModule, CNavtopComponent, CNavtopComponent],
  templateUrl: './p-layout.component.html',
  styleUrl: './p-layout.component.css'
})
export class PLayoutComponent {

  fetching = true;
  user_data: any;


  async fetch_user_data() {
    await new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        this.user_data = {
          empl_code: "71005122",
          empl_name: "Muhammad Ramzy",
          function_id: "IT",
          office_code: "904",
          office_name: "Depok",
        }

        localStorage.setItem('token', this.user_data);
        resolve();
      }, 1500);
    })
  }

  async ngOnInit() {
    this.fetching = true;

    console.log(this.user_data);
    await this.fetch_user_data();
    console.log(this.user_data);

    this.fetching = false;
  }


}
