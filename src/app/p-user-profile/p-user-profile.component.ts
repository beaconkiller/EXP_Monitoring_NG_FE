import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-p-user-profile',
    imports: [],
    templateUrl: './p-user-profile.component.html',
    styleUrl: './p-user-profile.component.css'
})
export class PUserProfileComponent {
  constructor(private router: Router) { }

  signOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
