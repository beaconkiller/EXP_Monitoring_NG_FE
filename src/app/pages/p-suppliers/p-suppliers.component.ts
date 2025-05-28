import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgSelectModule } from '@ng-select/ng-select';
import { CSuppliersActionBoxComponent } from "./c-suppliers-action-box/c-suppliers-action-box.component";
import { CLoadingWidgetComponent } from '../../c_/c-loading-widget/c-loading-widget.component';
import { get_user_detail } from '../../shared/utils_general';
import { config } from '../../../config/config';

@Component({
  selector: 'app-p-suppliers',
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    CSuppliersActionBoxComponent,
    CLoadingWidgetComponent,
  ],
  templateUrl: './p-suppliers.component.html',
  styleUrl: './p-suppliers.component.css'
})
export class PSuppliersComponent {
  constructor(private http: HttpClient, private snackbar: MatSnackBar) { }

  is_fetching = true;
  can_add_suppl = false;
  is_fetching_data = true;
  show_suppl_action_box = false;
  isFetching_add_suppl = false;
  act_bank: any = null;
  act_suppl: any = null;
  act_page = 1;
  tableData: any = [];
  arr_banks = [];
  arr_banks_base = [];
  suppl_name = '';
  suppl_rek_name = '';
  suppl_rek_no = '';
  suppl_bank_name = '';
  q_search = '';


  ngOnInit() {
    this.initLoad();
    this.is_fetching = false;
  }

  async initLoad() {
    await this.get_banks();
    this.get_suppliers();
  }


  jobCheck_it() {
    // G00123 -- STAFF IT

    let usr_dtl = get_user_detail()

    if (usr_dtl['EMPL_JOB'] == 'G00123') {
      return true;
    } else {
      return false;
    }
  }




  // ================================================
  // ==================== GETTER ====================
  // ================================================

  async get_banks() {
    let queryParams = {
      'data': 'data'
    }

    var xRes: any = await lastValueFrom(this.http.get(config.env_dev.host + '/api-eappr/get_banks', { params: queryParams }));

    this.arr_banks_base = xRes.data;

    let arr_tmp: any = [];
    (xRes.data).forEach((el: any) => {
      var bank_name = el['BANK_NAME'];
      arr_tmp.push(bank_name);
    });

    this.arr_banks = arr_tmp;
  }


  async get_suppliers() {
    this.is_fetching_data = true;

    let queryParams = {
      "q_page": this.act_page,
      "q_search": this.q_search.toLowerCase(),
    };

    var xRes: any = await lastValueFrom(this.http.get(config.env_dev.host + '/api-eappr/get_suppliers', { params: queryParams }));

    console.log(xRes);
    this.tableData = xRes.data;
    this.is_fetching_data = false;
  }




  // ================================================
  // ==================== INPUTS ====================
  // ================================================

  clear_act_bank() {
    // console.log('\n ============== clear_act_bank() ============== \n')
    this.act_bank = null;
    this.listen_inps();
  }


  on_banks_changed(e: Event) {
    let i: number = 0;
    this.arr_banks_base.forEach(el => {
      if (el['BANK_NAME'] == e) {
        this.act_bank = this.arr_banks_base[i];
        console.log(this.act_bank);
      }
      i++
    });
    this.listen_inps();
  }


  async add_supplier() {
    if (!this.can_add_suppl) {
      let notif_str = 'Periksa kembali informasi penambahan supplier.';
      this.snackbar.open(notif_str, undefined, {
        duration: 5000,
        panelClass: ['notif_failed']
      })
    }

    if (!this.isFetching_add_suppl && this.can_add_suppl) {
      this.isFetching_add_suppl = true;
      try {
        let queryParams = {
          "bank_code": this.act_bank['BANK_ID'],
          "bank_name": this.act_bank['BANK_NAME'],
          "suppl_rek_no": this.suppl_rek_no,
          "suppl_rek_name": this.suppl_rek_name,
          "suppl_name": this.suppl_name,
          "suppl_bank_name": this.suppl_bank_name,
          "empl_code": get_user_detail()['EMPL_CODE']
        };

        var xRes: any = await lastValueFrom(this.http.post(config.env_dev.host + '/api-eappr/add_supplier', queryParams))

        console.log(xRes);
        if (xRes.data.includes('berhasil')) {
          this.snackbar.open(xRes.data, undefined, {
            duration: 5000,
            panelClass: ['notif_success']
          })
        } else {
          this.snackbar.open(xRes.data, undefined, {
            duration: 5000,
            panelClass: ['notif_failed']
          })
        }


      } catch (err: any) {
        console.log(err.error.message);
        this.snackbar.open(err.error.message, undefined, {
          duration: 5000,
          panelClass: ['notif_failed']
        })
      } finally {
        this.isFetching_add_suppl = false;
      }
    }
  }


  listen_inps() {
    console.log(this.act_bank);
    if (
      this.suppl_name.length != 0 &&
      this.suppl_rek_name.length != 0 &&
      this.suppl_rek_no.length != 0 &&
      this.act_bank != null) {
      this.can_add_suppl = true;
    } else {
      this.can_add_suppl = false;
    }

    console.log(this.can_add_suppl);
  }


  reset_add_suppl() {
    this.suppl_bank_name = '';
    this.suppl_name = '';
    this.suppl_rek_name = '';
    this.suppl_rek_no = '';

    this.listen_inps();
  }


  pgUp() {
    this.act_page++
    localStorage.setItem('q_paging', this.act_page.toString())
    this.get_suppliers();
  }


  pgDown() {
    if (this.act_page > 1) {
      this.act_page--
      localStorage.setItem('q_paging', this.act_page.toString());
      this.get_suppliers();
    }
  }


  f_show_suppl_action_box(i: any) {
    let _act_suppl = this.tableData[i];
    this.act_suppl = _act_suppl;
    this.show_suppl_action_box = true;
  }


}
