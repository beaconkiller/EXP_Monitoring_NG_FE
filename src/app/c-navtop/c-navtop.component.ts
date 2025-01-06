import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-c-navtop',
    imports: [CommonModule, FormsModule],
    templateUrl: './c-navtop.component.html',
    styleUrl: './c-navtop.component.css'
})
export class CNavtopComponent {
  constructor(private router: Router) { }



  fetching = true;
  showMenu = true;

  empl_name: any = '';
  empl_jobcode: any = '';
  office_name: any = '';



  async fetch_user_data() {

    var usr_data:any = localStorage.getItem('user_dtl');
    var data_json:any = JSON.parse(usr_data)['data'][0];

    console.log(data_json);

    this.empl_name = data_json['EMPL_NAME'];
    this.empl_jobcode = data_json['JOB_DESCRIPTION'];
    this.office_name = data_json['NAME_SHORT'];

    this.fetching = true;
  }


  signOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  go_to_profile() {
    this.router.navigate(['/profile'])
  }









  async ngOnInit() {
    this.initLoad();
  }

  async initLoad(){
    await this.fetch_user_data();
  }






}
