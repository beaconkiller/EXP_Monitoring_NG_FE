import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CLoadingSpinComponent } from '../c_/c-loading-spin/c-loading-spin.component';
import { QuillModule } from 'ngx-quill'
import { FormsModule } from '@angular/forms';
import Quill from 'quill';


@Component({
  selector: 'app-p-new-memo',
  imports: [CLoadingSpinComponent,CommonModule, FormsModule],
  templateUrl: './p-new-memo.component.html',
  styleUrl: './p-new-memo.component.css',
  standalone:true,
})

export class PNewMemoComponent {

  is_fetching = true;
  editor_val = '';

  async ngOnInit(){
    this.fetchAll();
  }


  fetchAll(){
    this.is_fetching = false;
  }
}
