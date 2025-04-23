import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { lastValueFrom } from 'rxjs';
import { config } from '../../config/config';
import { get_user_code, get_user_detail } from '../shared/utils_general';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CLoadingSpinComponent } from "../c_/c-loading-spin/c-loading-spin.component";

@Component({
  selector: 'app-p-jenis-pembayaran',
  imports: [
    FormsModule,
    CommonModule,
    NgSelectComponent,
    HttpClientModule,
    CLoadingSpinComponent
],
  templateUrl: './p-jenis-pembayaran.component.html',
  styleUrl: './p-jenis-pembayaran.component.css'
})
export class PJenisPembayaranComponent {
  constructor( private http:HttpClient, private snackbar:MatSnackBar ){}

  is_fetching = true;
  is_fetching_data = false;
  tableData:any = [];
  q_search = ''; 
  act_page = 1;
  act_jenis_pemb = '';
  act_jenis_pemb_group = '';
  allow_add_jenis_pemb = false;
  
  arr_jenis_pemb_group = [
    'P_CABANG',
    'P_PUSAT',
  ]



  ngOnInit(){
    this.act_jenis_pemb_group = this.arr_jenis_pemb_group[0];
  }



  listen_inps(){
    if(
      this.act_jenis_pemb.length != 0 &&
      this.act_jenis_pemb_group.length != 0
    ){
        this.allow_add_jenis_pemb = true;
    }else{
      this.allow_add_jenis_pemb = false;
    }
  }  



  async get_tableData(){
    this.is_fetching_data = true;
    
    let queryParams = {
      "q_page":this.act_page,
      "q_search":this.q_search.toLowerCase(),
    };

    var xRes:any = await lastValueFrom(this.http.get(config.env_dev.host+'/api-eappr/get_jenis_pembayaran',{params:queryParams}));
    
    console.log(xRes);
    this.tableData = xRes.data;
    this.is_fetching_data = false;
  }



  jobCheck_it(){
    // G00123 -- STAFF IT

    let usr_dtl = get_user_detail()

    if(usr_dtl['EMPL_JOB'] == 'G00123'){
      return true;
    }else{
      return false;
    }
  }

  

  // ======================== INPUTS =========================
  // ======================== INPUTS =========================
  // ======================== INPUTS =========================

  reset_jenis_pemb(){

  }

  f_show_jenis_pemb_action_box(i:any){
    console.log(i);
  }

  async add_jenis_pemb(){
    if(this.allow_add_jenis_pemb){

      let queryParams = {
        'name_type' : this.act_jenis_pemb,
        'group_type' : this.act_jenis_pemb_group,
        'empl_code' : get_user_code(),
      }

      var xRes:any = await lastValueFrom(this.http.post(config.env_dev.host+'/api-eappr/add_jenis_pembayaran', queryParams));
      
      console.log(xRes);

      if(xRes.status == 200){
        this.snackbar.open(xRes.message, undefined, {
          duration: 5000,
          panelClass: 'notif_success'
        })
        this.get_tableData();
      }else{
        this.snackbar.open(xRes.message, undefined, {
          duration: 5000,
          panelClass: 'notif_failed'
        })
      }
    }
  }


  pgUp() {
    this.act_page++
    localStorage.setItem('q_paging', this.act_page.toString())
    this.get_tableData();
  }


  pgDown() {
    if (this.act_page > 1) {
      this.act_page--
      localStorage.setItem('q_paging', this.act_page.toString());
      this.get_tableData();
    }
  }


  clear_act_pemb_group(){
    this.act_jenis_pemb = '';
    this.listen_inps();
  }

}
