import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { config } from '../../config/config';
import { get_user_detail } from '../shared/utils_general';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-p-suppliers',
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './p-suppliers.component.html',
  styleUrl: './p-suppliers.component.css'
})
export class PSuppliersComponent {
  constructor(private http:HttpClient, private snackbar : MatSnackBar){}

  is_fetching = false;
  can_add_suppl= false;
  fetching_tableData = true;
  isFetching_add_suppl = false;
  tableData = [];
  suppl_name = '';
  suppl_rek_name = '';
  suppl_rek_no = '';
  suppl_bank_name = '';


  ngOnInit(){
    this.initLoad();
  }

  async initLoad(){
    
  }


  async get_suppliers(){
    let queryParams = {
      "data":"data"
    };

    var xRes = await lastValueFrom(this.http.get(config.env_dev.host+'/api-eappr/get_suppliers',{params:queryParams}));

    console.log(xRes);
  }

  // ================================================
  // ==================== INPUTS ====================
  // ================================================

  async add_supplier(){
    if(!this.can_add_suppl){
      let notif_str = 'Periksa kembali informasi penambahan supplier.';
      this.snackbar.open(notif_str, undefined, {
        duration: 5000,
        panelClass: ['notif_failed']
      })
    }

    if(!this.isFetching_add_suppl && this.can_add_suppl){
      this.isFetching_add_suppl = true;
      try { 
        let queryParams = {
          "suppl_rek_no":this.suppl_rek_no,
          "suppl_rek_name":this.suppl_rek_name,
          "suppl_name":this.suppl_name,
          "suppl_bank_name":this.suppl_bank_name,
          "empl_code":get_user_detail()['EMPL_CODE']
        };
  
        var xRes:any = await lastValueFrom(this.http.post(config.env_dev.host+'/api-eappr/add_supplier', queryParams))
  
        console.log(xRes);
        if(xRes.data.includes('berhasil')){
          this.snackbar.open(xRes.data, undefined, {
            duration: 5000,
            panelClass: ['notif_success']
          })
        }else{
          this.snackbar.open(xRes.data, undefined, {
            duration: 5000,
            panelClass: ['notif_failed']
          })
        }
  
        
      } catch (err:any) {
        console.log(err.error.message);
        this.snackbar.open(err.error.message, undefined, {
          duration: 5000,
          panelClass: ['notif_failed']
        })
      }finally{
        this.isFetching_add_suppl = false;
      }
    }
  }

  listen_inps(){
    if(
      this.suppl_bank_name.length != 0 && 
      this.suppl_name.length != 0 && 
      this.suppl_rek_name.length != 0 && 
      this.suppl_rek_no.length != 0){
        this.can_add_suppl = true;
    }else{
      this.can_add_suppl = false;
    }
    console.log(this.can_add_suppl);
  }

  reset_add_suppl(){
    this.suppl_bank_name = ''; 
    this.suppl_name = ''; 
    this.suppl_rek_name = ''; 
    this.suppl_rek_no = '';

    this.listen_inps();
  }

}
