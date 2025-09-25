import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';


@Injectable({
    providedIn: 'root'
})
export class repo_ws_parse {

    parse_storage(str: string | null) {
        let arr_tmp = str?.split('\n');

        let arr_map = [];
        for (var el of arr_tmp!) {
            let arr_split = el.trim().split(/\s+/);

            let newObj: any = {
                'Filesystem': arr_split[0],
                'Size': arr_split[1],
                'Used': arr_split[2],
                'Avail': arr_split[3],
                'Use%': arr_split[4],
                'Mounted On': arr_split[5],
            }

            arr_map.push(newObj);
        }

        return arr_map;
    }



}