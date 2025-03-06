import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { get_user_code, get_user_detail } from '../shared/utils_general';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { config } from '../../config/config';


@Component({
    selector: 'app-p-user-profile',
    imports: [CommonModule, HttpClientModule],
    templateUrl: './p-user-profile.component.html',
    styleUrl: './p-user-profile.component.css'
})
export class PUserProfileComponent {
  constructor(private router: Router, private snackbar : MatSnackBar, private http : HttpClient) { }

  empl_name:String = '';
  empl_code:String = '';
  empl_mail:String = '';
  empl_branch:String = '';
  new_empl_mail:String = '';
  canSave_email:boolean = false; 
  isFetching_save_email:boolean = false;
  
  ngOnInit(){
    this.initLoad();
  }
  

  initLoad(){
    this.set_user_info();
  };




  // =============================================
  // =================== LISTENER =================
  // =============================================

  listen_canSave_email(event:any){
    var val = (event.target as HTMLInputElement).value;

    this.new_empl_mail = val;
    
    if(val != this.empl_mail){
      this.canSave_email = true;
    }else{
      this.canSave_email = false;
    }
  }

  detect_save_mail(){
    let str = this.new_empl_mail;

    if(!str.includes('@') || !str.includes('.')){
      let notif_str = 'Format email tidak sesuai'; 

      // ----- NOTIF -----
        this.snackbar.open(notif_str, undefined, {
          duration: 5000,
          panelClass: ['notif_failed']
        })

      return false;
    }else{
      return true;
    }
  }


  // ===========================================
  // =================== INPUTS =================
  // ===========================================

  set_user_info(){
    let user_info = get_user_detail();
    console.log(user_info);
    console.log(user_info['email']);

    this.empl_name = user_info['EMPL_NAME'];
    this.empl_code = user_info['EMPL_CODE'];
    this.empl_branch = user_info['NAME_FULL'];
    this.empl_mail = user_info['email'];
  };

  async save_new_user_detail(){

  }


  signOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  async save_email(){
    console.log(this.canSave_email)
    console.log(this.isFetching_save_email)
    console.log(this.new_empl_mail);

    if(this.canSave_email && !this.isFetching_save_email){
      if(!this.detect_save_mail()){
        return;
      };
      
      try {
        this.isFetching_save_email = true;
        let queryParams = {
          empl_code: get_user_code(),
          mail_to_change : this.new_empl_mail
        }
  
    
        var xRes:any = await lastValueFrom(this.http.post(config.env_dev.host+'/api-eappr/user_change_email', queryParams));
        
        // ----- NOTIF -----
        this.snackbar.open(xRes.message, undefined, {
          duration: 5000,
          panelClass: ['notif_success']
        })


        if(xRes.status == 200){
          let userDtl_str =  localStorage.getItem('user_dtl')!;
          let userDtl = JSON.parse(userDtl_str)['data'][0];

          console.log(userDtl);

          userDtl['email'] = this.new_empl_mail;

          localStorage.setItem('user_dtl', JSON.stringify({
            "isSuccess" : true,
            "message":"success",
            "data": [userDtl]
          }));

          this.canSave_email = false;
        }
        
        
      } catch (error) {
        console.log(error);
      }finally{
        this.isFetching_save_email = false;
      }
    }
  }
}
