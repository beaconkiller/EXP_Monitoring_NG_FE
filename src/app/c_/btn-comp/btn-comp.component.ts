import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-btn-comp',
  imports: [FormsModule, CommonModule],
  templateUrl: './btn-comp.component.html',
  styleUrl: './btn-comp.component.css'
})
export class BtnCompComponent {
  @Input() btn_str:any;
  @Input() btn_text_size:String = 'text-md';
  @Input() btn_active:boolean = true;
  @Input() btn_custom:String = '';
  @Output() btn_func = new EventEmitter();



  ngOnInit(){
    if(!this.btn_str){
      this.btn_str = 'Button Text'
    }
  }

  run_btn_func(){
    console.log('btn_func');
    console.log(this.btn_active);
    if(this.btn_active){
      this.btn_func.emit();
    }
  }
}
