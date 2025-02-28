import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { config } from '../../config/config';
import { HttpClient, HttpClientModule, HttpHeaders, provideHttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-p-login',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './p-login.component.html',
  styleUrl: './p-login.component.css',
  standalone: true,
})
export class PLoginComponent {
  constructor(private router: Router, private http: HttpClient) { };

  fetching = false;


  usn = '';
  pwd = '';
  resp_login = '';

  // user_dtl: any = {
  //   empl_name: 'Muhammad Ramzy',
  //   empl_code: '71005122',
  //   empl_jobcode: 'IT',
  //   office_name: 'Depok',
  // }

  user_dtl = {};


  async login() {

    if(!this.fetching){
      this.fetching = true;
      this.resp_login = '';
    
      let queryParams = {
        pwd : this.pwd.toString(),
        usn : this.usn.toString(),
      } 

      var xRes:any = await lastValueFrom(this.http.get(config.env_dev.host+'/api-eappr/login_main', {params: queryParams}));
      
      // var xRes:any = await lastValueFrom(this.http.post(config.env_dev.host+'/api-eappr/mobile/v1/login_mobile', queryParams)); // DEBUG TEST PAKE API MOBILE  
      // // var xRes:any = await lastValueFrom(this.http.get('/api-eappr/login_main', {params: queryParams}));
      // // var xRes:any = await lastValueFrom(this.http.get(config.env_dev.host + ':'+config.env_dev.port+'/api-eappr/login_main', {params: queryParams}));
      
      console.log(xRes);
      if(xRes['isSuccess'] != true){
        this.resp_login = xRes['message'];
        this.fetching = false;
      }else{

        // ------------------------------------------ 
        // ----------------- SUCCESS ----------------- 
        // ------------------------------------------ 

        this.account_setup(xRes)
        this.router.navigate(['/home']);
        this.fetching = false;
      }  
  
      this.fetching = false;
    }
  }


  

  account_setup(data: any) {
    console.log(data);

    let act_acc = this.user_dtl;
    let currTime: any = Date.now();
    let gen_token: any = this.usn + '|' + currTime;

    
    localStorage.setItem('user_dtl', JSON.stringify(data));
    localStorage.setItem('q_paging', '1');
    localStorage.setItem('act_request_id', '');
  }


}
