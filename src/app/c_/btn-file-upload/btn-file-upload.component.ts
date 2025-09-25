import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-btn-file-upload',
  imports: [FormsModule, CommonModule, NgIcon],
  templateUrl: './btn-file-upload.component.html',
  styleUrl: './btn-file-upload.component.css'
})
export class BtnFileUploadComponent {
  act_file: any = {
    file_name: '',
    file_base64: '',
  };

  arr_files = [];


  chooseFile_v2(e: any) {
    let src = (e.target as HTMLElement).parentElement
    let inp = (src?.querySelector('.inputFile') as HTMLElement)

    var inpFile = document.createElement("input");
    inpFile.setAttribute('type', 'file');
    inpFile.setAttribute("accept", ".pdf");
    inpFile.click();

    inpFile.onchange = (event) => {
      let files = (event.target as HTMLInputElement).files

      if (files) {
        let file = files[0];

        console.log(file);

        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          this.act_file = {
            file_name: file.name,
            file_base64: base64String
          }

        }

        reader.readAsDataURL(file);
      }
    }
  }


  clear_file() {
    this.act_file = {
      file_name: '',
      file_base64: '',
    }
  }

  getter_file() {
    return this.act_file;
  }

  validator_file_exist() {
    if (this.act_file['file_name'].length == 0) {
      return false;
    }

    return true;
  }
}
