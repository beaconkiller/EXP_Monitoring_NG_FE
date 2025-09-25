import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-btn-file-upload-multiple',
  imports: [FormsModule, CommonModule, NgIcon],
  templateUrl: './btn-file-upload-multiple.component.html',
  styleUrl: './btn-file-upload-multiple.component.css'
})
export class BtnFileUploadMultipleComponent {

  arr_files: any = [];


  chooseFile_v2(e: any){
    let src = (e.target as HTMLElement).parentElement
    let inp = (src?.querySelector('.inputFile') as HTMLElement)

    var inpFile = document.createElement("input");
    inpFile.setAttribute('type', 'file');
    inpFile.setAttribute("accept", ".pdf, .jpg, .jpeg, .png");
    inpFile.setAttribute('multiple', '');
    inpFile.click();

    inpFile.onchange = async(event) => {
      let files = (event.target as HTMLInputElement).files

      if (files) {

        // =============================================================================
        // ========== IF FILE EXIST (USER DIDNT CANCEL THE FILEPICK PROCESS) ==========
        // =============================================================================

        let arr_tmp = [];

        for (let i = 0; i < files.length; i++) {
          let el = files[i]

          const readFileAsBase64 = (file: File) => {
            return new Promise((resolve) => {
              const reader = new FileReader();

              reader.onload = () => {
                resolve({
                  file_name: el['name'],
                  file_base64: reader.result as string,
                })
              }
              reader.readAsDataURL(file);
            })
          }
          arr_tmp.push(await readFileAsBase64(el));
        }

        this.arr_files = arr_tmp;
      }
    }
  }


  clear_file(i:number) {
    this.arr_files.splice(i, 1)
  }


  getter_file() {
    return this.arr_files;
  }
}
