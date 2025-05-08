import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { get_user_code, get_user_detail } from '../../shared/utils_general';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { config } from '../../../config/config';


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
  empl_branch:String = '';
  empl_mail:String = '';
  empl_hp:String = '';
  new_empl_hp:String = '';
  new_empl_mail:String = '';
  canSave:boolean = false;
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

  inp_listener(){
    console.log('asdasd');
    console.log(this.empl_hp);
    console.log(this.new_empl_hp);
  }

  listen_canSave_email(event:any){
    var val = (event.target as HTMLInputElement).value;

    this.new_empl_mail = val;
    
    console.log(this.new_empl_mail);

    if(val != this.empl_mail){
      this.canSave = true;
    }else{
      this.canSave = false;
    }
  }

  listen_canSave_phone(event:any){
    var val = (event.target as HTMLInputElement).value;

    this.new_empl_hp = val;
    
    console.log(this.new_empl_hp);

    if(val != this.empl_hp){
      this.canSave = true;
    }else{
      this.canSave = false;
    }
  }

  detect_save_mail(){
    let str = this.new_empl_mail;
    let str_phone = this.new_empl_hp;

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
    this.empl_hp = user_info['NO_HP'];

    this.new_empl_hp = this.empl_hp;
    this.new_empl_mail = this.empl_mail;
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

    if(this.canSave && !this.isFetching_save_email){
      if(!this.detect_save_mail()){
        return;
      };
      
      try {
        this.isFetching_save_email = true;
        let queryParams = {
          empl_code: get_user_code(),
          mail_to_change : this.new_empl_mail,
          phone_to_change : this.new_empl_hp
        }
  
    
        var xRes:any = await lastValueFrom(this.http.post(config.env_dev.host+'/api-eappr/user_change_email', queryParams));
        
        // -------------- NOTIF --------------
        this.snackbar.open(xRes.message, undefined, {
          duration: 5000,
          panelClass: ['notif_success']
        })


        if(xRes.status == 200){
          let userDtl_str =  localStorage.getItem('user_dtl')!;
          let userDtl = JSON.parse(userDtl_str)['data'][0];

          console.log(userDtl);

          userDtl['email'] = this.new_empl_mail;
          userDtl['NO_HP'] = this.new_empl_hp;

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
