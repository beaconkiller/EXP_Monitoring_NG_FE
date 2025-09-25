import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgSelectComponent, NgOptionComponent } from '@ng-select/ng-select';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-btn-lov-search',
  imports: [NgSelectComponent, FormsModule, NgOptionComponent],
  templateUrl: './btn-lov-search.component.html',
  styleUrl: './btn-lov-search.component.css'
})
export class BtnLovSearchComponent {

  @Input() inp_arr_items: any;
  @Output() out_on_change = new EventEmitter();
  arr_items: any = [];
  act_selection: any = null;

  arr_items_placeholder = [
    'Test 1',
    'Test 2',
  ]

  ngOnInit() {

    console.log(this.inp_arr_items[0]);

    if (this.inp_arr_items == null) {
      this.arr_items = this.arr_items_placeholder;
      this.act_selection = this.arr_items[0];
    } else {
      this.act_selection = this.inp_arr_items[0]['str_key'];
      this.arr_items = this.inp_arr_items;
    }
  }



  on_change(e: Event) {
    this.out_on_change.emit();
  }




  getter_act_selection() {
    return this.act_selection;
  }

  getter_act_selection_full() {
    for (var el of this.arr_items) {
      if (this.act_selection == el['str_key']) {
        return el;
      }
    }

    return null;
  }

}
