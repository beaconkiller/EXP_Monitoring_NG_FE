import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { config } from '../../config/config';
import { lastValueFrom } from 'rxjs';
import { get_user_detail } from '../shared/utils_general';
import { Route, Router } from '@angular/router';

@Component({
    selector: 'app-p-cek-pengajuan',
    imports: [FormsModule, CommonModule, HttpClientModule],
    templateUrl: './p-cek-pengajuan.component.html',
    styleUrl: './p-cek-pengajuan.component.css'
})
export class PCekPengajuanComponent {
    constructor (private http:HttpClient, private route:Router){}

    fetching_tableData = true;
    q_search:any = '';
    tableData : any = [];
    act_page = localStorage.getItem('q_paging') != null || undefined ? parseInt(localStorage.getItem('q_paging')!) : 0;  
    
    arr_lov_filter = [
      {
        "string":"On Process",
        "code":"OP",
      },
      {
        "string":"Finished",
        "code":"AP",
      },
      {
        "string":"Rejected",
        "code":"RJ",
      },
    ]

    // ===========================================================
    // ======================== INITLOAD ===========================
    // ===========================================================

    ngOnInit(){
        this.initLoad();
    }


    async initLoad(){
        // this.get_tableData();
        this.fetching_tableData = false;
    }


    async get_tableData(){
        // console.log(' ========== get_tabledata ========== ')
        this.fetching_tableData = true;

        let queryParams = {
            q_page:this.act_page,
            q_search:this.q_search,
            user_dtl: JSON.stringify(get_user_detail())
        }

        var xRes:any = await lastValueFrom(this.http.get(config.env_dev.host + ':'+config.env_dev.port+'/api-eappr/get_table_data',{params:queryParams}))

        console.log(xRes['data']);
        this.tableData = xRes['data'];

        this.fetching_tableData = false;
    }
    

    // =========================================================
    // ======================== INPUTS ===========================
    // =========================================================


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
    
      onPageChangeEnter(e:Event){
        let val = (e.target as HTMLInputElement).value;

        if(parseInt(val) > 0){
            this.act_page = parseInt(val);
            localStorage.setItem('q_paging', this.act_page.toString())
            this.get_tableData()
        }
      }

      go_to_detail(req_id:string){
        localStorage.setItem('act_request_id', req_id);
        this.route.navigate(['request-dtl']);
        console.log(req_id);
      }


      on_filter_change(val:String){
        console.log(val);
      }


    // =========================================================
    // ======================== FORMATTER ===========================
    // =========================================================
    
    give_date(v:String){
        let str_v = v.replace(' ','\n');
        return v
    }




}
