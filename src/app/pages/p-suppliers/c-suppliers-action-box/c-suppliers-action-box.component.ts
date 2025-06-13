import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, input, Output, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { config } from '../../../../config/config';

@Component({
  selector: 'app-c-suppliers-action-box',
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './c-suppliers-action-box.component.html',
  styleUrl: './c-suppliers-action-box.component.css'
})
export class CSuppliersActionBoxComponent {
  constructor(private http:HttpClient, private snackbar:MatSnackBar){}
  @Output() closePopupEvent = new EventEmitter();
  @Output() getApproval = new EventEmitter();
  @Input() supplData:any;

  is_fetching:boolean = false;
  is_fetching_update:boolean = false;
  supplData_new:any = null;


  ngOnInit(){
    this.supplData_new = {...this.supplData};
  }



  update_validation_check(){
    if (JSON.stringify(this.supplData) === JSON.stringify(this.supplData_new)) {
      return false;
    } else {
      return true;
    }
  }


  // ======================= INPUTS ========================
  // ======================= INPUTS ========================
  // ======================= INPUTS ========================

  closeThis(){
    this.closePopupEvent.emit();
  }


  cancelAction(event:Event){
    event.stopPropagation();
  }


  async remove_suppl(){
    this.is_fetching_update = true;

    let queryParams = {
      'supl_id' : this.supplData['SUPL_ID'] 
    } 

    let xRes:any = await lastValueFrom(this.http.post(config.env_dev.host+'/api-eappr/remove_suppl', queryParams));

    if(xRes.status == 200){
      let notif_str = 'Update supplier berhasil.'
      this.snackbar.open(notif_str, undefined, {
        duration: 5000,
        panelClass: ['notif_success']
      });    
    }

    this.is_fetching_update = false;
  }


  async update_suppl(){
    if(this.update_validation_check()){
      this.is_fetching_update = true;
      
      let queryParams = {
        'data':this.supplData_new
      } 
  
      let xRes:any = await lastValueFrom(this.http.post(config.env_dev.host+'/api-eappr/update_suppl', queryParams));  
      
      if(xRes.status == 200){
        let notif_str = 'Update supplier berhasil.';

        this.snackbar.open(notif_str, undefined, {
          duration: 5000,
          panelClass: ['notif_success']
        });

        this.getApproval.emit();
        this.closePopupEvent.emit();
      }else{
        let notif_str = 'Update supplier gagal.';

        this.snackbar.open(notif_str, undefined, {
          duration: 5000,
          panelClass: ['notif_failed']
        })  

      }
      
      this.is_fetching_update = false;
    }else{
      let notif_str = 'Tidak ada perubahan.'
      this.snackbar.open(notif_str, undefined, {
        duration: 5000,
        panelClass: ['notif_neutral']
      })
  }
  }
}
