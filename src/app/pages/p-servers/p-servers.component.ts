import { Component } from '@angular/core';
import { BtnCompComponent } from "../../c_/btn-comp/btn-comp.component";
import { repo_ws } from '../../../repository/repo.ws';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkVirtualScrollableElement } from "@angular/cdk/scrolling";
import { CServerStorageComponent } from "../../c_/c-server-storage/c-server-storage.component";
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-p-servers',
  imports: [CommonModule, FormsModule, BtnCompComponent, CdkVirtualScrollableElement, CServerStorageComponent, MatProgressSpinner],
  templateUrl: './p-servers.component.html',
  styleUrl: './p-servers.component.css'
})
export class PServersComponent {
  constructor(
    private rws: repo_ws,
  ) { }


  wsSub?: Subscription;
  arr_connection: Array<any> = [];
  act_server: any = null;
  bool_detail_expand: boolean = false;


  ngOnInit() {
    this.initLoad();
  }


  ngOnDestroy() {
    this.wsSub?.unsubscribe();
  }


  async initLoad() {
    this.sub_ws();
    this.get_clients();
  }


  sub_ws() {
    this.wsSub = this.rws.getter_messages().subscribe({
      next: (msg) => {
        this.get_clients();
      }
    });
  }


  get_clients() {
    let x: Map<any, any> = this.rws.getter_cients();

    this.arr_connection = [];

    let arr_tmp: any = [];
    x.forEach((el: any) => {
      arr_tmp.push(el)
    });

    this.arr_connection = arr_tmp;
  }


  get_storage(client: any) {
    this.rws.get_storage(client);
    this.get_clients();
  }


  get_storage_all() {
    this.rws.get_storage_all()
  }


  set_act_server(device_id: any) {
    console.log(device_id);


    if (this.act_server == device_id) {
      this.act_server = null;
    } else {
      this.act_server = null;
      setTimeout(() => {
        this.act_server = device_id;
      }, 1);
    }
  }


  expand_detail() {
    this.bool_detail_expand = !this.bool_detail_expand;
    console.log(this.bool_detail_expand);
  }


  // ============================================================
  // ======================= FORMATTER ==========================
  // ============================================================

  get_int_progress(val: any) {
    return parseInt(val);
  }


  get_ram_usage(data: any) {
    let mem_free = data['ram_free'];
    let mem_total = data['ram_total'];
    let mem_usage = data['ram_usage'];

    let perc_usage = parseInt((mem_usage / mem_total * 100).toString());

    return perc_usage;
  }


  get_ram_info(data: any) {
    let mem_free = data['ram_free'];
    let mem_total = data['ram_total'];
    let mem_usage = data['ram_usage'];

    let str = `(${mem_usage.toFixed(2)} / ${mem_total})`

    return str;
  }


  get_overall_storage(data: any) {
    return data.toFixed(2);
  }
}
