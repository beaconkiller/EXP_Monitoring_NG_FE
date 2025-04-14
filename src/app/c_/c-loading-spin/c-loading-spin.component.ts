import { Component, Input } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-c-loading-spin',
  imports: [MatProgressSpinnerModule],
  templateUrl: './c-loading-spin.component.html',
  styleUrl: './c-loading-spin.component.css'
})
export class CLoadingSpinComponent {
  @Input() size:number = 70;

}
