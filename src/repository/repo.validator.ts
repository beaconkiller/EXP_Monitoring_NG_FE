import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class repo_validator {
    enc_str(val: String) {
        try {
            val = val.replaceAll("'", "%27");
            val = val.replaceAll('"', '%22');

            return val;
        } catch (error) {
            return '';
        }
    }

    dec_str(val: String) {
        try {
            val = val.replaceAll("%27", "'");
            val = val.replaceAll('%22', '"');

            return val;
        } catch (error) {
            return '';
        }
    }

}