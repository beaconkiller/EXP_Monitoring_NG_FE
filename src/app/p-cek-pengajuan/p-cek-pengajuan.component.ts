import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { config } from '../../config/config';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-p-cek-pengajuan',
    imports: [FormsModule, CommonModule, HttpClientModule],
    templateUrl: './p-cek-pengajuan.component.html',
    styleUrl: './p-cek-pengajuan.component.css'
})
export class PCekPengajuanComponent {
    constructor (private http:HttpClient){}


    q_search:any = '';
    tableData : any;
    act_page = localStorage.getItem('q_paging') != null || undefined ? parseInt(localStorage.getItem('q_paging')!) : 0;  
    

    // =========================================================
    // ======================== INITLOAD ===========================
    // =========================================================

    ngOnInit(){
        this.initLoad();
    }


    async initLoad(){
        this.get_tableData();
    }


    async get_tableData(){
        console.log(' ========== get_tabledata ========== ')
        let queryParams = {

        }

        var xRes:any = await lastValueFrom(this.http.get(config.env_dev.host+'/api/get_table_data'))

        console.log(xRes['data']);
        this.tableData = xRes['data'];


    }
    

    // =========================================================
    // ======================== INPUTs ===========================
    // =========================================================

    getData(){

    };


    pgUp() {
        this.act_page++
        localStorage.setItem('q_paging', this.act_page.toString())
        this.getData();
      }
    
      pgDown() {
        if (this.act_page > 0) {
          this.act_page--
          localStorage.setItem('q_paging', this.act_page.toString());
          this.getData();
        }
      }
    

}
