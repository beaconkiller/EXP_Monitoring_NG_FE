import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { get_user_detail } from '../shared/utils_general';
import { lastValueFrom } from 'rxjs';
import { config } from '../../config/config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CPengajuanTableComponent } from '../c-pengajuan-table/c-pengajuan-table.component';

@Component({
    selector: 'app-p-approve-pengajuan',
    imports: [CommonModule, FormsModule, HttpClientModule, CPengajuanTableComponent],
    templateUrl: './p-approve-pengajuan.component.html',
    styleUrl: './p-approve-pengajuan.component.css'
})
export class PApprovePengajuanComponent {
    constructor (private http:HttpClient, private route:Router){}

    fetching_tableData = true;
    q_search:any = '';
    tableData : any = [];
    act_page = localStorage.getItem('q_paging') != null || undefined ? parseInt(localStorage.getItem('q_paging')!) : 0;  
    

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
            user_dtl: JSON.stringify(get_user_detail())
        }

        var xRes:any = await lastValueFrom(this.http.get(config.env_dev.host+'/api-eappr/get_table_data_approval',{params:queryParams}))

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



    // =========================================================
    // ======================== FORMATTER ===========================
    // =========================================================
    
    give_date(v:String){
        let str_v = v.replace(' ','\n');
        return v
    }




}
