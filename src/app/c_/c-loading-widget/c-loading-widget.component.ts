import { Component } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-c-loading-widget',
  imports: [MatProgressSpinnerModule],
  templateUrl: './c-loading-widget.component.html',
  styleUrl: './c-loading-widget.component.css'
})
export class CLoadingWidgetComponent {

}
