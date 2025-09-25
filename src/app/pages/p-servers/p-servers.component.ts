import { Component } from '@angular/core';
import { BtnCompComponent } from "../../c_/btn-comp/btn-comp.component";
import { repo_ws } from '../../../repository/repo.ws';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-p-servers',
  imports: [CommonModule, FormsModule, BtnCompComponent],
  templateUrl: './p-servers.component.html',
  styleUrl: './p-servers.component.css'
})
export class PServersComponent {
  constructor(
    private rws: repo_ws,
  ) { }


  wsSub?: Subscription;
  arr_connection: Array<any> = [];


  ngOnInit() {
    this.initLoad();
    this.get_clients();
  }


  ngOnDestroy() {
    this.wsSub?.unsubscribe();
  }


  async initLoad() {
    this.sub_ws();
  }


  sub_ws() {
    this.wsSub = this.rws.getter_messages().subscribe({
      next: (msg) => {


        if (msg['type'] == 'get_clients') {
          this.get_clients();
        }
      }
    });
  }


  get_clients() {
    let x: Map<any, any> = this.rws.getter_cients();

    this.arr_connection = [];

    x.forEach((el: any) => {
      console.log(el);
      console.log(el['device_id'])
      this.arr_connection.push(el)
    })
  }


  get_storage(client: any) {
    this.rws.get_storage(client);
  }


  get_storage_all(){
    this.rws.get_storage_all()
  }
}
