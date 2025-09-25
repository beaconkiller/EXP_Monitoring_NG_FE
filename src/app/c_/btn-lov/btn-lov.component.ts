import { Component, Input } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-btn-lov',
  imports: [NgSelectComponent, CommonModule, FormsModule],
  templateUrl: './btn-lov.component.html',
  styleUrl: './btn-lov.component.css'
})
export class BtnLovComponent {
  @Input() inp_arr_items:Array<any> = [
    {
      "val": "All",
      "key": "All",
    }
  ];

  act_opt = this.inp_arr_items[0]['key'];
  
  getter_act_item(){
    return this.act_opt;
  }

}
