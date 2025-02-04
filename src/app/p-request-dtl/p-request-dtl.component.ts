import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { config } from '../../config/config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  
} from '@angular/material/dialog';
import { CApproveBoxComponent } from './c-approve-box/c-approve-box.component';
import { get_user_detail } from '../shared/utils_general';


@Component({
  selector: 'app-p-request-dtl',
  imports: [HttpClientModule, CommonModule, FormsModule, CApproveBoxComponent],
  templateUrl: './p-request-dtl.component.html',
  styleUrl: './p-request-dtl.component.css',
  standalone:true,
})
export class PRequestDtlComponent {
  constructor(private http:HttpClient){}
  @ViewChild('spawnApprove') spawnApprove!: ElementRef<HTMLDialogElement>;


  req_id:any;
  arr_item_pengajuan:any = [];
  arr_approval_data:any = [];
  pengajuan_header:any = {};
  arr_img_data:any = [];
  spawn_box_approve:boolean = false;
  send_to_dialog:any = {};
  base64_sig_data:any = null;


  file_data = {
    file_name : null as any,
    data: null as any,
  };
  

  ngOnInit(){
    this.initLoad()
  }

  async initLoad(){
    this.req_id = localStorage.getItem('act_request_id');

    this.get_item_pengajuan();
    await this.get_file_data();
    this.get_approval_data();
    // this.get_image_file();

    console.log(this.file_data);
    console.log(this.file_data['file_name']);


    this.send_to_dialog = {
      req_id : this.req_id,
      empl_code : get_user_detail()['EMPL_CODE'],
    }
  }


  // ================================================================
  // ========================= DATA GETTER ============================
  // ================================================================


  async get_item_pengajuan(){
    // console.log('get_item_pengajuan');

    let queryParams = {
      req_id : this.req_id,
    }

    var xRes:any = await lastValueFrom(this.http.get(config.env_dev.host + '/api/get_detail_pengajuan_item',{params:queryParams}));
    this.arr_item_pengajuan = xRes.data; 
  }


  async get_file_data(){
    // console.log('get_file_data')

    let queryParams = {
      req_id : this.req_id,
    }

    var xRes:any = await lastValueFrom(this.http.get(config.env_dev.host + '/api/get_file_data',{params:queryParams}));

    console.log(xRes);
    this.file_data = xRes.data;
  }

  
  async get_approval_data(){
    let queryParams = {
      req_id : this.req_id,
    }

    var xRes:any = await lastValueFrom(this.http.get(config.env_dev.host + '/api/get_approval_data',{params:queryParams}));
    console.log(xRes.data);

    this.arr_approval_data = xRes.data;
  }


  async get_image_file(){
    console.log('get_image_file')
    let queryParams = {
      req_id : this.req_id
    }

    var xRes:any = await lastValueFrom(this.http.get(config.env_dev.host + '/api/get_sig_img_data',{params:queryParams}));

    console.log(xRes)

    // let filePath = `assets/img/w_nav_logo_small.png`
    // return filePath;
  }


  // ==============================================================
  // ========================= INPUTS ============================
  // ==============================================================

  file_view(){

    let base64Data = this.file_data.data;

    console.log(base64Data);

    const byteCharacters = atob(base64Data);
    const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Open the file in a new tab
    window.open(url, '_blank');
  }

  file_download(){
    let base64Data = this.file_data.data;
    const fileName = "download.pdf"; // Desired file name
    const dataUrl = `data:application/pdf;base64,${base64Data}`;


    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName;


    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  dialog_approve_exit(){
    this.spawn_box_approve = false;
  }
  
  dialog_approve_spawn(){
    this.spawn_box_approve = true;
  }


  // ==============================================================
  // ========================= FORMATTER ============================
  // ==============================================================

  format_rp(v:any){
    // console.log(v)
    return v
  }

  format_status_str(v:any){
    if(v == 'AP'){
      return 'Approve'
    }else if(v == 'RJ'){
      return 'Reject'
    }else if(v == 'RC'){
      return 'Re-check'
    }else{
      return '-'
    }
  }

}
