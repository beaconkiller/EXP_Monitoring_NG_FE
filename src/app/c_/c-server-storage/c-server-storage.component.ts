import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { repo_ws } from '../../../repository/repo.ws';
import { Subscription } from 'rxjs';
import { BtnCompComponent } from "../btn-comp/btn-comp.component";
import { CServerDbComponent } from "../c-server-db/c-server-db.component";
import { CServerPm2Component } from "../c-server-pm2/c-server-pm2.component";

@Component({
  selector: 'app-c-server-storage',
  imports: [CommonModule, FormsModule, BtnCompComponent, CServerDbComponent, CServerPm2Component],
  templateUrl: './c-server-storage.component.html',
  styleUrl: './c-server-storage.component.css'
})
export class CServerStorageComponent {
  constructor(
    private rws: repo_ws,
  ) { }

  @Input() inp_device_id: any;

  server_data = null;
  wsSub?: Subscription;


  ngOnInit() {
    this.initLoad();
  }

  ngOnDestroy() {
    this.wsSub?.unsubscribe();
  }



  initLoad() {
    this.sub_ws();
    this.server_data = this.rws.getter_client_by_id(this.inp_device_id);
    this.rws.get_storage(this.inp_device_id);
  }

  sub_ws() {
    this.wsSub = this.rws.getter_messages().subscribe({
      next: (msg) => {
        this.server_data = this.rws.getter_client_by_id(this.inp_device_id);
        // this.rws.get_storage(this.inp_device_id);
      }
    });
  }



}
