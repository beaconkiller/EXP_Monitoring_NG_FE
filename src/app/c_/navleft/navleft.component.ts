import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navleft',
  imports: [RouterModule, CommonModule],
  templateUrl: './navleft.component.html',
  styleUrl: './navleft.component.css'
})
export class NavleftComponent {
  is_expanded: boolean = false;


  menuItems =
    [
      // { name: 'Home', route: 'home'  },
      { name: 'Servers', route: 'servers' },
    ]



  f_expand() {
    this.is_expanded = !this.is_expanded;
  }

  f_close_menu() {
    this.is_expanded = true;
  }
}
