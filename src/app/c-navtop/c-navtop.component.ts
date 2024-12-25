import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-c-navtop',
    imports: [CommonModule, FormsModule],
    templateUrl: './c-navtop.component.html',
    styleUrl: './c-navtop.component.css'
})
export class CNavtopComponent {
  constructor(private router: Router) { }



  fetching = true;
  showMenu = true;

  empl_name: any = '';
  empl_jobcode: any = '';
  office_name: any = '';



  async fetch_user_data() {
    await new Promise<void>((resolve) => {
      setTimeout(() => {

        this.empl_name = 'Muhammad Ramzy';
        this.empl_jobcode = 'IT';
        this.office_name = 'Depok';

        this.fetching = true;

        resolve();
      }, 2000);

    })
  }


  signOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  go_to_profile() {
    this.router.navigate(['/profile'])
  }









  async ngOnInit() {
    await this.fetch_user_data();
  }






}
