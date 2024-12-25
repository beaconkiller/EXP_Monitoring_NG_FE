import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-f-pembelian-materai',
  imports: [
    CommonModule, FormsModule,
  ],
  templateUrl: './f-pembelian-materai.component.html',
  styleUrl: './f-pembelian-materai.component.css'
})
export class FPembelianMateraiComponent {

  act_cabang = '-'

  arr_send = [

  ]


}
