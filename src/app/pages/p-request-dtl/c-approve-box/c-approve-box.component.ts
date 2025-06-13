import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CSignaturePadComponent } from '../c-signature-pad/c-signature-pad.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { config } from '../../../../config/config';
import { lastValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { repo_validator } from '../../../../repository/repo.validator';

@Component({
  selector: 'app-c-approve-box',
  imports: [CommonModule, FormsModule, CSignaturePadComponent, HttpClientModule],
  templateUrl: './c-approve-box.component.html',
  styleUrl: './c-approve-box.component.css'
})
export class CApproveBoxComponent {
  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private route: Router,
    private repVal: repo_validator,
  ) { }

  @Output() dialog_exit = new EventEmitter<any>();
  @Input() req_data: any;

  arr_approval: any = [
    {
      appr: 'AP',
      appr_name: 'Approve'
    },
    {
      appr: 'RJ',
      appr_name: 'Reject'
    },
    // {
    //   appr:'RC',
    //   appr_name:'Re-Check'
    // },
  ]

  canSend: boolean = false;
  isFetching: boolean = false;
  act_appr: any;
  act_reason: any = '';
  base64_sig_data: any;

  ngOnInit() {
    this.initLoad()
  }


  initLoad() {
    this.act_appr = this.arr_approval[0]['appr']

    console.log(this.req_data);
    console.log(this.act_reason.length)
  }



  // ======================================================
  // ======================== INPUTS =======================
  // ======================================================


  change_sig(e: Event) {
    this.base64_sig_data = e;
    this.canSend_bool();
  }

  on_appr_change(e: Event) {
    let val = (e.target as HTMLSelectElement).value;
    this.act_appr = val;
  }

  onExit() {
    this.dialog_exit.emit()
  }


  async send_approve() {
    console.log('send_approve');
    console.log(this.act_reason);
    console.log(this.canSend);

    if (this.canSend) {
      this.isFetching = true;

      let queryParams = {
        REQ_ID: this.req_data['req_id'],
        EMPL_CODE: this.req_data['empl_code'],
        STATUS: this.act_appr,
        REASON: this.repVal.enc_str(this.act_reason),
      }

      var xRes: any = await lastValueFrom(this.http.post(config.env_dev.host + '/api-eappr/approval_approve', { queryParams }));
      const msg = xRes.data;

      if (msg.toString().toLowerCase().includes('berhasil')) {

        // --------------------------------------------------------
        // ----------------------- SUCCESS --------------------------
        // --------------------------------------------------------

        // ------------------------- NOTIF -------------------------
        this.snackbar.open(msg, undefined, {
          duration: 5000,
          panelClass: ['notif_success']
        })


        // ------------- REDIRECT TO LIST APPROVAL PAGE -------------

        this.route.navigate(['approve-pengajuan'])

        // setTimeout(() => {
        //   this.route.navigate(['approve-pengajuan'])
        // }, 2000);        

      } else {

        // --------------------------------------------------------
        // ----------------------- FAILED --------------------------
        // --------------------------------------------------------

        // ----- NOTIF -----
        this.snackbar.open('Approval gagal.', undefined, {
          duration: 5000,
          panelClass: ['notif_neutral']
        })

        this.isFetching = false;
      }
    }
  }


  on_reason_change(e: Event) {
    let val = (e.target as HTMLInputElement).value;
    this.act_reason = val

    this.canSend_bool();
  }

  canSend_bool() {
    if (this.act_reason != '' && !this.isFetching) {
      this.canSend = true
    } else {
      this.canSend = false
    }

    // console.log(this.canSend);
  }


  // ======================================================
  // ======================== UTILS =======================
  // ======================================================

  get_file_name() {
    let file_ext = this.base64_sig_data.split(';')[0].split('/')[1];
    // console.log(file_ext)


    let final_str = `${this.req_data['req_id']}_${this.req_data['empl_code']}.${file_ext}`
    return final_str;
  }

  get_file_data() {
    let file_data = this.base64_sig_data.split(',')[1];

    // console.log(file_data)
    return file_data;
  }

  dec_string(val: String) {
    return this.repVal.dec_str(val);
  }

}
