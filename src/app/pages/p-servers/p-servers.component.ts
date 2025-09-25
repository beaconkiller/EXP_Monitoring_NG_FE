import { Component } from '@angular/core';
import { BtnCompComponent } from "../../c_/btn-comp/btn-comp.component";
import { repo_ws } from '../../../repository/repo.ws';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkVirtualScrollableElement } from "@angular/cdk/scrolling";
import { CServerStorageComponent } from "../../c_/c-server-storage/c-server-storage.component";

@Component({
  selector: 'app-p-servers',
  imports: [CommonModule, FormsModule, BtnCompComponent, CdkVirtualScrollableElement, CServerStorageComponent],
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
    if (this.act_server == device_id) {
      this.act_server = null;
    } else {
      this.act_server = device_id;
    }
  }
}
