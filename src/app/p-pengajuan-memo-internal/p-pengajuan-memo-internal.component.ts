import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Editor, NgxEditorModule } from 'ngx-editor'

@Component({
  selector: 'app-p-pengajuan-memo-internal',
  imports: [NgxEditorModule, CommonModule, FormsModule],
  templateUrl: './p-pengajuan-memo-internal.component.html',
  styleUrl: './p-pengajuan-memo-internal.component.css'
})
export class PPengajuanMemoInternalComponent implements OnInit, OnDestroy{


  editor: any;
  html = '';

  ngOnInit(): void {
    this.editor = new Editor();
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
