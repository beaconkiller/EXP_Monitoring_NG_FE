import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { repo_jenis_pembayaran } from '../repo.jenis_pemb';

@Component({
  selector: 'app-c-jenis-pemb-action-box',
  imports: [CommonModule, FormsModule],
  templateUrl: './c-jenis-pemb-action-box.component.html',
  styleUrl: './c-jenis-pemb-action-box.component.css'
})
export class CJenisPembActionBoxComponent {
  @Output() out_closeThis = new EventEmitter();

  constructor(
    private repJenis : repo_jenis_pembayaran,
  ){}

  is_fetching_update = false;
  curr_data_jenis:any = null
  name_jenis:any = '';
  new_name_jenis:any = '';
  is_act_jenis:any = '';
  new_is_act_jenis:any = '';



  ngOnInit(){
    this.setInit();
  }


  setInit(){
    this.curr_data_jenis = this.repJenis.get_jenis_pemb();

    this.new_name_jenis = this.curr_data_jenis.NAME_TYPE;
    this.new_is_act_jenis = this.curr_data_jenis.is_active;
  }

  
  closeThis(){
    this.out_closeThis.emit();
  }


  cancelAction(event:Event){
    event.stopPropagation();
  }


  remove_jenis_pemb(){
    this.is_fetching_update = true;
  }
  
  
  update_jenis_pemb(){
    this.is_fetching_update = true;
  }
}
