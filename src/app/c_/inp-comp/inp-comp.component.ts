import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-inp-comp',
  imports: [],
  templateUrl: './inp-comp.component.html',
  styleUrl: './inp-comp.component.css'
})

export class InpCompComponent {
  @Input() inp_custom: String = '';
  @Input() inp_ph: String = '';
  @Input() val: String = '';
  @Input() is_act: boolean = true;
  @Output() valChange = new EventEmitter();
  @Output() func_inp = new EventEmitter();


  ngOnInit() {
    if (this.inp_custom.length == 0) {
      this.inp_custom = 'w-[110px]'
    }
  }

  onInput(event: Event) {
    const inp = event.target as HTMLInputElement;
    this.valChange.emit(inp.value.trim());
    this.func_inp.emit();
  }

}
