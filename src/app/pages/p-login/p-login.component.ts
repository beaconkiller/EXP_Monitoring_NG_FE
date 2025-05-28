import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { config } from '../../../config/config';
import { HttpClient, HttpClientModule, HttpHeaders, provideHttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { get_user_detail } from '../../shared/utils_general';

@Component({
  selector: 'app-p-login',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './p-login.component.html',
  styleUrl: './p-login.component.css',
  standalone: true,
})
export class PLoginComponent {
  snackbar: any;
  constructor(private router: Router, private http: HttpClient) { };

  fetching = false;


  usn = '';
  pwd = '';
  resp_login = '';


  user_dtl = {};

  async login() {

    if (!this.fetching) {
      this.fetching = true;
      this.resp_login = '';

      let queryParams = {
        pwd: this.pwd.toString(),
        usn: this.usn.toString(),
      }

      var xRes: any = await lastValueFrom(this.http.get(config.env_dev.host + '/api-eappr/login_main', { params: queryParams }));

      console.log(xRes);
      if (xRes['isSuccess'] != true) {
        this.resp_login = xRes['message'];
        this.fetching = false;
      } else {

        // ------------------------------------------ 
        // ----------------- SUCCESS ----------------- 
        // ------------------------------------------ 

        await this.account_setup(xRes)
        this.router.navigate(['/home']);
        this.fetching = false;
      }

      this.fetching = false;
    }
  }




  async account_setup(data: any) {
    console.log(data);

    localStorage.setItem('user_dtl', JSON.stringify(data));
    localStorage.setItem('q_paging', '1');
    localStorage.setItem('act_request_id', '');


    // let menuData:any = await this.getMenu();
    // console.log(menuData);
    // localStorage.setItem('menuData', JSON.stringify(menuData['data']));
  }


  async getMenu() {
    try {
      let queryParams = {
        user_dtl: get_user_detail(),
      }

      let xRes: any = await lastValueFrom(this.http.post(config.env_dev.host + '/api-eappr/get_menu', queryParams));
      return xRes;

    } catch (error) {
      console.log(error);
    }

  }



}
