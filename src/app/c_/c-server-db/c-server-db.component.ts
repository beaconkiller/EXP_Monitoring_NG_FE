import { Component, Input } from '@angular/core';
import { repo_ws } from '../../../repository/repo.ws';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-c-server-db',
  imports: [CommonModule, FormsModule],
  templateUrl: './c-server-db.component.html',
  styleUrl: './c-server-db.component.css'
})
export class CServerDbComponent {

  constructor(
    private rws: repo_ws,
  ) { }

  @Input() inp_device_id: any;

  wsSub?: Subscription;
  server_data: any = null;
  arr_installed_db = [];


  ngOnInit() {
    this.initLoad();
  }

  ngOnDestroy() {
    this.wsSub?.unsubscribe();
  }



  initLoad() {
    this.sub_ws();
    this.rws.ws_send('get_installed_db', this.inp_device_id);
  }


  set_installed_db() {
    if (this.server_data['installed_db']) {
      console.log(this.server_data);
      this.arr_installed_db = this.server_data['installed_db'];
    }
  }


  get_status_active_postgree() {
    this.rws.ws_send('get_status_active_postgree', this.inp_device_id);
  }


  


  sub_ws() {
    this.wsSub = this.rws.getter_messages().subscribe({
      next: (msg) => {
        if (msg['type'] == 'give_installed_db') {
          this.server_data = this.rws.getter_client_by_id(this.inp_device_id);
          this.set_installed_db();
          this.get_status_active_postgree();
        } else if (msg['type'] == 'give_status_active_postgree') {
          console.log(msg);
        }
      }
    });
  }

}
