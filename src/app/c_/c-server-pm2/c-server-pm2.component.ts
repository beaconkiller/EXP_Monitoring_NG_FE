import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { repo_ws } from '../../../repository/repo.ws';
import { CommonModule } from '@angular/common';
import { NgIcon } from "@ng-icons/core";

@Component({
  selector: 'app-c-server-pm2',
  imports: [CommonModule, NgIcon],
  templateUrl: './c-server-pm2.component.html',
  styleUrl: './c-server-pm2.component.css'
})
export class CServerPm2Component {

  constructor(
    private rws: repo_ws,
  ) { }

  @Input() inp_device_id: any;

  wsSub?: Subscription;
  arr_pm2: any = [];


  ngOnInit() {
    this.initLoad();
  }

  ngOnDestroy() {
    this.wsSub?.unsubscribe();
  }

  sub_ws() {
    this.wsSub = this.rws.getter_messages().subscribe({
      next: (msg) => {
        if (msg['type'] == 'give_pm2_list') {
          this.arr_pm2 = this.rws.getter_client_by_id(this.inp_device_id)['pm2'];
        }
      }
    });
  }

  async initLoad() {
    this.sub_ws();
    this.rws.ws_send('get_pm2_list', this.inp_device_id);
    // this.rws.ws_send('get_pm2_sudo_list', this.inp_device_id);
  }


  // ================== FORMATTER ==================
  // ================== FORMATTER ==================
  // ================== FORMATTER ==================

  get_ram(val: any) {
    try {
      return `${(val / 1024 / 1024).toFixed(2)} MB`;
    } catch (error) {
      return '';
    }
  }



  get_uptime(val: any) {
    try {
      const ms = Date.now() - val;
      const sec = Math.floor(ms / 1000);

      const days = Math.floor(sec / (3600 * 24));
      const hours = Math.floor((sec % (3600 * 24)) / 3600);
      const minutes = Math.floor((sec % 3600) / 60);
      const seconds = sec % 60;

      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } catch (error) {
      return '';
    }
  }


}
