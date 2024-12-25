import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-c-item-pengajuan',
  imports: [],
  templateUrl: './c-item-pengajuan.component.html',
  styleUrl: './c-item-pengajuan.component.css',
  standalone: true,
  
})
export class CItemPengajuanComponent {
  @Input() itemName!: string;

}
