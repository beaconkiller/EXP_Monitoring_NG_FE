import { Component, Input } from '@angular/core';
import { repo_ws } from '../../../repository/repo.ws';

@Component({
  selector: 'app-c-server-db',
  imports: [],
  templateUrl: './c-server-db.component.html',
  styleUrl: './c-server-db.component.css'
})
export class CServerDbComponent {
  constructor(
    private rws: repo_ws,
  ) { }

  @Input() inp_device_id: any;




  ngOnInit() {
    this.initLoad();
  }


  initLoad() {
    console.log(this.inp_device_id);
    console.log('get_installed_db');

    this.rws.ws_send('get_installed_db', this.inp_device_id);
  }
}
