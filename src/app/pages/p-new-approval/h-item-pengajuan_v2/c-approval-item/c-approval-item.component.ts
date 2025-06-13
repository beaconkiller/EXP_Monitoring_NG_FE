import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { config } from '../../../../../config/config';
import { get_user_detail } from '../../../../shared/utils_general';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { repo_user } from '../../../../../repository/repo.user';

@Component({
  selector: 'app-c-approval-item',
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './c-approval-item.component.html',
  styleUrl: './c-approval-item.component.css',
  standalone: true,
})
export class CApprovalItemComponent {
  constructor(
    private http: HttpClient,
    private repUser: repo_user
  ) { }

  @Input() itemData!: any;
  @Input() itemIndex!: any;
  @Input() total_i!: any;
  @Output() itemDataChange = new EventEmitter<any>();
  @Output() deleteThis = new EventEmitter<any>();

  itemDataVal: any;
  act_user: any;
  act_cabang: any | null;
  act_sub_area: any | null;
  act_job: any | null;
  act_person: any | null;
  act_person_obj: any | null;
  act_checker: any | null;
  last_item: any = false;
  exl_empl_code: any;

  lov_cabang: any;
  lov0: any;
  lov1: any;

  fetching_cabang = true;
  fetching_subarea = true;
  fetching_person = true;

  arr_checker = [
    'APPROVE',
    'CEK'
  ]


  ngOnInit() {
    this.initLoad();
  }

  async initLoad() {
    this.set_init();
    await this.get_cabang();
    this.act_user = this.repUser.get_usr_empl_code();
  }




  // =======================================================
  // ======================= INITLOAD ========================
  // =======================================================

  set_init() {
    this.itemDataVal = { ...this.itemData };
    this.act_cabang = '-';
    this.act_person = null;
    this.act_person_obj = null;

    this.last_item = (this.itemIndex + 1) == this.total_i ? true : false;

    console.log(this.itemIndex + 1)
    console.log(this.total_i)

    // console.log(this.act_sub_area)
  }



  // =======================================================
  // ======================= INPUTS ========================
  // =======================================================

  async on_lov_cabang_change(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const branch_code = selectElement.value;
    const branch_name = selectElement.options[selectElement.selectedIndex].text;
    const i = selectElement.selectedIndex;

    let selected_cabang = this.lov_cabang[i];

    this.act_cabang = branch_code
    this.act_job = null;
    this.act_person = null;
    this.act_sub_area = selected_cabang['personal_subarea']



    // ------ RESET LOWER LEVEL LOV ------
    this.act_checker = null;
    this.act_person = null;
    this.act_person_obj = null;



    // // --------------- DEBUG ----------------

    // console.log([
    //   this.act_cabang,
    //   this.act_sub_area,
    //   this.act_job,
    //   this.act_person,
    //   this.act_person_obj,
    //   this.act_checker,
    // ])


    await this.get_appr_subarea();
  }

  async on_lov0_change(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const subArea = selectElement.value;
    const empl_job = selectElement.options[selectElement.selectedIndex].text;

    this.act_sub_area = subArea
    this.act_job = empl_job

    console.log([this.act_person, this.act_person_obj])

    // ------ RESET LOWER LEVEL LOV ------
    this.act_checker = null;
    this.act_person = null;


    await this.get_appr_person();
  }


  async on_lov1_change(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const i = selectElement.options[selectElement.selectedIndex].index;
    this.act_person_obj = this.lov1[i];

    // ------ RESET LOWER LEVEL LOV ------
    this.act_checker = null;

  }


  on_checker_change(event: Event) {
    const selElement = event.target as HTMLSelectElement;
    const i = selElement.selectedIndex;

    this.change_act_person();
  }


  change_act_person() {
    // console.log('======== change act person  ==========')

    // console.log(this.act_person_obj);
    // console.log(this.itemDataVal);

    this.itemData['EMPL_NAME'] = this.act_person_obj['empl_name']
    this.itemData['EMPL_CODE'] = this.act_person_obj['empl_code']
    this.itemData['LVL'] = this.itemIndex
    this.itemData['POSISION'] = this.act_checker

    this.itemDataChange.emit(this.itemData);

    // console.log(this.itemData);
  }

  removeThis(event: Event): void {
    console.log(this.itemIndex); // Log the index
    this.deleteThis.emit(this.itemIndex); // Emit the index to the parent
  }



  // ======================================================
  // ==================== GETTING DATA ====================
  // ======================================================

  async get_cabang() {
    // console.log('get_user_cabang');
    this.fetching_cabang = true;

    let queryParams = {
      personal_subarea: get_user_detail()['personal_subarea'],
      EMPL_BRANCH: get_user_detail()['EMPL_BRANCH']
    }

    var xRes: any = await lastValueFrom(this.http.get(config.env_dev.host + '/api-eappr/get_user_cabang', { params: queryParams }))
    this.lov_cabang = xRes.data;


    // ------ RESET LOWER LEVEL LOV ------
    this.act_cabang = null;
    this.act_job = null;

    this.fetching_cabang = false;
  }


  async get_appr_subarea() {
    console.log('get_appr_subarea');
    this.fetching_subarea = true;

    let queryParams = {
      empl_branch: this.act_cabang,
      empl_subarea: this.act_sub_area,
    }

    var xRes: any = await lastValueFrom(this.http.get(config.env_dev.host + '/api-eappr/get_appr_subarea', { params: queryParams }))
    this.act_sub_area = null; // ---- NEED TO RESET SO THE LOV DEFAULT WOULD BE NULL
    this.lov0 = xRes.data;

    // ------ RESET LOWER LEVEL LOV ------
    this.act_job = null;
    this.act_person = null;

    this.fetching_subarea = false;
  }


  async get_appr_person() {
    console.log('get_user_cabang');
    this.fetching_person = true

    let queryParams = {
      EMPL_BRANCH: this.act_cabang,
      empl_subarea: this.act_sub_area,
      ACT_JOB: this.act_job,
      act_user: this.act_user
    }

    var xRes: any = await lastValueFrom(this.http.get(config.env_dev.host + '/api-eappr/get_appr_person', { params: queryParams }))
    this.lov1 = xRes.data;

    // ------ RESET LOWER LEVEL LOV ------
    this.act_person_obj = null;
    this.act_person = null;

    this.fetching_person = false;
  }
}
