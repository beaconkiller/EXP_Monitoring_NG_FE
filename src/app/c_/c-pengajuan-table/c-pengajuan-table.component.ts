import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { get_user_detail } from '../../shared/utils_general';
import { lastValueFrom } from 'rxjs';
import { config } from '../../../config/config';
import { FormsModule } from '@angular/forms';
import { CLoadingSpinComponent } from "../c-loading-spin/c-loading-spin.component";
import { repo_validator } from '../../../repository/repo.validator';

@Component({
  selector: 'app-c-pengajuan-table',
  imports: [HttpClientModule, CommonModule, FormsModule, CLoadingSpinComponent],
  templateUrl: './c-pengajuan-table.component.html',
  styleUrl: './c-pengajuan-table.component.css'
})

export class CPengajuanTableComponent {
  constructor(
    private http: HttpClient,
    private route: Router,
    private repValid: repo_validator,
  ) { }

  fetching_tableData = true;
  first_load: number = 0;
  q_search: any = '';
  q_filter: any = 'All';
  q_page_code: number = 0;
  tableData: any = [];
  act_page = localStorage.getItem('q_paging') != null || undefined ? parseInt(localStorage.getItem('q_paging')!) : 0;

  arr_lov_filter = [
    {
      "string": "All",
      "code": "All",
    },
    {
      "string": "On Process",
      "code": "OP",
    },
    {
      "string": "Finished",
      "code": "AP",
    },
    {
      "string": "Rejected",
      "code": "RJ",
    },
  ]

  // ===========================================================
  // ======================== INITLOAD ===========================
  // ===========================================================

  ngOnInit() {
    this.initLoad();
  }


  async initLoad() {
    // this.get_tableData();
    this.fetching_tableData = false;
    this.q_filter = this.arr_lov_filter[0]['code'];

    this.pageDetect();
  }

  pageDetect() {
    console.log('\n =========== pageDetect() ========== \n');
    let url = this.route.url;

    if (url == '/cek-pengajuan') {
      this.q_page_code = 2;
    } else if (url == '/approve-pengajuan') {
      this.q_page_code = 1;
    } else if (url == '/info-pengajuan') {
      this.q_page_code = 0;

    }

    console.log(url);
  }


  async get_tableData() {
    // console.log(' ========== get_tabledata ========== ')
    this.fetching_tableData = true;

    try {
      let queryParams = {
        q_page: this.act_page,
        q_search: this.q_search,
        q_filter: this.q_filter,
        user_dtl: JSON.stringify(get_user_detail())
      }

      if (this.q_page_code == 0) {
        var xRes: any = await lastValueFrom(this.http.get(config.env_dev.host + '/api-eappr/get_table_data', { params: queryParams }))

        console.log(xRes['data']);

        this.tableData = xRes['data'];
      } else if (this.q_page_code == 1) {
        var xRes: any = await lastValueFrom(this.http.get(config.env_dev.host + '/api-eappr/get_table_data_approval', { params: queryParams }))

        console.log(xRes['data']);

        this.tableData = xRes['data'];
      } else if (this.q_page_code == 2) {
        var xRes: any = await lastValueFrom(this.http.get(config.env_dev.host + '/api-eappr/get_table_data_histori', { params: queryParams }))

        console.log(xRes['data']);

        this.tableData = xRes['data'];
      }
    } catch (error) {
      console.log(error);
    }



    this.first_load = 1;
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

  onPageChangeEnter(e: Event) {
    let val = (e.target as HTMLInputElement).value;

    if (parseInt(val) > 0) {
      this.act_page = parseInt(val);
      localStorage.setItem('q_paging', this.act_page.toString())
      this.get_tableData()
    }
  }

  go_to_detail(req_id: string) {
    localStorage.setItem('act_request_id', req_id);
    this.route.navigate(['request-dtl'], {
      queryParams: {
        'id': req_id
      }
    });
    console.log(req_id);
  }


  on_filter_change(e: Event) {
    let val = (e.target as HTMLSelectElement).value;
    console.log(val);

    let pos: number = 0;
    for (let i = 0; i < this.arr_lov_filter.length; i++) {
      let curr_filter_name = this.arr_lov_filter[i]['string'];
      if (val == curr_filter_name) {
        pos = i;
        break;
      }
    }

    this.q_filter = this.arr_lov_filter[pos]['code'];
    this.get_tableData();
  }


  // =========================================================
  // ======================== FORMATTER ===========================
  // =========================================================

  give_date(v: String) {
    let str_v = v.replace(' ', '\n');
    return v
  }

  dec_str(val: String) {
    return this.repValid.dec_str(val);
  }





}
