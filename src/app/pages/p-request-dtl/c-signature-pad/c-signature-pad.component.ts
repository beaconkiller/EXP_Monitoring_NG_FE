import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-c-signature-pad',
  imports: [CommonModule],
  templateUrl: './c-signature-pad.component.html',
  styleUrl: './c-signature-pad.component.css'
})
export class CSignaturePadComponent {
  @ViewChild('canvas') canvasEl!: ElementRef;
  @Output() base64_sig_data = new EventEmitter<any>();

  signatureNeeded!: boolean;
  signaturePad!: SignaturePad;
  signatureImg!: string;
  base64_sig:any; 


  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }

  startDrawing(event: Event) {
    console.log('asd')
    // works in device not in browser
  }

  stopDrawing(event: Event) {
    const base64Data = this.signaturePad.toDataURL()
    this.base64_sig_data.emit(base64Data);
  }

  clearPad() {
    this.signaturePad.clear();
    const base64Data = null
    this.base64_sig_data.emit(base64Data);
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    this.signatureNeeded = this.signaturePad.isEmpty();
    if (!this.signatureNeeded) {
      this.signatureNeeded = false;
    }
  }

}
