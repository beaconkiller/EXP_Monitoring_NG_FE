import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { config } from '../../config/config';
import { HttpClient, HttpClientModule, HttpHeaders, provideHttpClient } from '@angular/common/http';

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


  usn: String = '';
  pwd: String = '';

  deb_account: any = {
    empl_name: 'Muhammad Ramzy',
    empl_code: '71005122',
    empl_jobcode: 'IT',
    office_name: 'Depok',
  }

  act_acc = {};


  async login() {
    let xRes: any;

    this.fetching = true;

    const x = new Promise<void>((resolve, reject) => {
      this.http.get(config.env_dev.host + '/api/test').subscribe({
        next: resp => {
          xRes = (resp);



          // SUCCESS 
          this.account_setup(xRes)



          this.router.navigate(['/home']);


          this.fetching = false;
          return resolve();
        }, error: err => console.log(err)
      })
    })
  }


  account_setup(data: any) {
    let act_acc = this.deb_account;
    let currTime: any = Date.now();
    let gen_token: any = this.usn + '|' + currTime;

    localStorage.setItem('token', JSON.stringify(gen_token));
    localStorage.setItem('user_dtl', JSON.stringify(act_acc));

  }


}
