import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class repo_user {
    usr_detail: any = this.get_curr_usr_dtl();


    get_curr_usr_dtl() {
        let x = JSON.parse(localStorage.getItem('user_dtl')!)['data'][0];
        return x;
    }



    get_usr_detail() {
        const curr_user = this.usr_detail;
        return this.usr_detail;
    }



    get_usr_empl_code() {
        return this.usr_detail['EMPL_CODE'];
    }



    get_usr_token() {
        return this.usr_detail['token'];
    }
}