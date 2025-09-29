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

            if (arr_split[0] != '') {
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
        }

        arr_map.splice(0, 1);

        // console.log(arr_map);

        return arr_map;
    }



    get_summary_storage(data: any) {
        // console.log(data);

        let i = 0;
        let total = 0;
        for (var el of data) {
            let x = parseInt(el['Use%'].trim().replaceAll('%', ''));
            total += x;
        }

        total = total / data.length;

        return total;
    }



    parse_installed_db(data: any) {
        if (data.length != 0) {
            let arr_map: any = {
                'postgresql': 0,
                'mysql': 0
            }

            let arr_string = data.split('\n');

            let i = 0;
            for (var el of arr_string) {
                Object.keys(arr_map).forEach((el_obj: any) => {
                    if (el.toUpperCase().includes(el_obj.toUpperCase())) {
                        arr_map[el_obj] += 1;
                    }
                });
                i += 1;
            }

            let arr_db:any = [];
            Object.keys(arr_map).forEach((el) => {
                let num = arr_map[el];
                if(num > 0){
                    arr_db.push({
                        db_name:el,
                        db_status: null,
                    });
                }
            })

            return arr_db;
        }
    }



}