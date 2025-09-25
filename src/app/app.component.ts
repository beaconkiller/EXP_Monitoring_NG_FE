import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { config } from '../config/config';
import { get_user_detail } from './shared/utils_general';


@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HttpClientModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private http:HttpClient, private router:Router){}

  title = 'TF_E_Approval';

  ngOnInit(){
    // this.checkSession();
  }


  async checkSession(){
    try {
      let headers = {
        'authorization':`bearer ${get_user_detail().token}`,
      };
  
      let xRes:any = await lastValueFrom(this.http.get(config.env_dev.host+'/api-eappr/session_check',{headers:headers}));
  
      if(xRes.status == 401){
        localStorage.clear();
        this.router.navigate(['/login']);
      }

      return xRes;

    } catch (error) {
      console.log(error);
    }
  }
}
