import { Component } from '@angular/core';
import { NavleftComponent } from "../c_/navleft/navleft.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { CNavtopComponent } from "../c_/c-navtop/c-navtop.component";
import { CommonModule } from '@angular/common';
import { repo_ws } from '../../repository/repo.ws';

@Component({
  selector: 'app-p-layout',
  imports: [CommonModule, NavleftComponent, RouterModule, CNavtopComponent, CNavtopComponent],
  templateUrl: './p-layout.component.html',
  styleUrl: './p-layout.component.css'
})
export class PLayoutComponent {
  constructor(
    private ws: repo_ws,
  ) { }

  fetching = false;
  user_data: any;


  async ngOnInit() {
    this.initLoad();
  }


  async initLoad() {
    this.ws.connect();
  }


}
