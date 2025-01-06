import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { config } from '../../config/config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-p-request-dtl',
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './p-request-dtl.component.html',
  styleUrl: './p-request-dtl.component.css',
  standalone:true,
})
export class PRequestDtlComponent {
  constructor(private http:HttpClient){}

  req_id:any;
  arr_item_pengajuan:any = [];
  pengajuan_header:any = {};
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
    this.get_file_data();
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
    let queryParams = {
      req_id : this.req_id,
    }

    var xRes:any = await lastValueFrom(this.http.get(config.env_dev.host + '/api/get_file_data',{params:queryParams}));
    // this.arr_item_pengajuan = xRes.data; 
    this.file_data = xRes.data;
  }


  // ==============================================================
  // ========================= FORMATTER ============================
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


  // ==============================================================
  // ========================= FORMATTER ============================
  // ==============================================================

  format_rp(v:any){
    // console.log(v)
    return v
  }

}
