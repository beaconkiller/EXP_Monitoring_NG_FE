import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTooltipModule} from '@angular/material/tooltip'


@Component({
    selector: 'app-c-navtop',
    imports: [CommonModule, FormsModule, MatTooltipModule],
    templateUrl: './c-navtop.component.html',
    styleUrl: './c-navtop.component.css'
})

export class CNavtopComponent {
  constructor(private router: Router) { }

  fetching:boolean = true;
  showMenu:boolean = true;
  spawn_warning:boolean = false;
  warning_str:string = '';
  empl_data : any;
  empl_name: any = '';
  empl_jobcode: any = '';
  office_name: any = '';
  arr_warning:Array<any> = [];



  async ngOnInit() {
    this.initLoad();
  }

  async initLoad(){
    await this.fetch_user_data();

    this.fetching = false;
  }


  async fetch_user_data() {

    var usr_data:any = localStorage.getItem('user_dtl');
    var data_json:any = JSON.parse(usr_data)['data'][0];

    console.log(data_json);

    this.empl_data = data_json;

    this.empl_name = data_json['EMPL_NAME'];
    this.empl_jobcode = data_json['JOB_DESCRIPTION'];
    this.office_name = data_json['NAME_SHORT'];

    this.f_email_check();

    this.f_warning_check();
  }

  f_email_check(){
    let user_email = this.empl_data['email'];

    if(!user_email){
      this.arr_warning.push('+ User belum mengisi email');
    }
  }


  signOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  go_to_profile() {
    this.router.navigate(['/profile'])
  }


  f_warning_check(){    
    if(this.arr_warning.length > 0){
      this.warning_str = this.arr_warning.join('\n')

      this.spawn_warning = true;
    }else{
      this.warning_str = '';
      this.spawn_warning = false;
    }
  }


















}
