import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { repo_ws_parse } from "./repo.ws_parse";


@Injectable({
    providedIn: 'root'
})
export class repo_ws {
    constructor(
        private rwp: repo_ws_parse,
    ) { }

    private socket$: WebSocketSubject<any> | null = null;
    arr_clients: Map<any, any> = new Map();


    async connect() {
        this.socket$ = webSocket('ws://localhost:4099');

        this.socket$.subscribe({
            next: (msg) => {
                this.handler_message(msg);
            },

            error: (err) => {
                console.error(err);
                this.socket$ = null;
                this.reconnect();
            },

            complete: () => {
                console.log('Connection closed')
            }
        });

        this.socket$.next({ type: 'register', deviceId: 'HOST_21' });
    }


    async reconnect() {
        while (!this.socket$) {
            await new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 2000);
            });

            this.connect();
        }
    }


    handler_message(msg: any) {
        console.log(msg);

        if (msg['type'] == 'get_clients') {
            this.map_clients(msg['message']);
        }

        if (msg['type'] == 'give_storage') {
            this.set_storage(msg);

        }
    }


    map_clients(arr_clients: any) {
        arr_clients.forEach((el: any) => {
            this.arr_clients.set(el['device_id'], {
                device_id: el['device_id'],
            });
        })

        console.log(arr_clients);
    }


    get_clients() {
        this.send({
            type: 'get_clients',
            payload: 'get_clients'
        });
    }



    get_storage(device_id: any) {
        this.send({
            type: 'get_storage',
            payload: device_id,
        })
    }



    get_storage_all() {
        console.log(this.arr_clients);

        this.arr_clients.forEach((el: any) => {
            console.log(el)
        })
    }



    set_storage(msg: any) {
        let arr_storage = this.rwp.parse_storage(msg['message']);
        let act_obj = this.arr_clients.get(msg['device_id']);

        const newObj = { ...act_obj, arr_storage };

        this.arr_clients.set(msg['device_id'], newObj);

        console.log(this.arr_clients);
    }



    send(data: any) {
        this.socket$?.next(data);
    }



    getter_socket() {
        return this.socket$;
    }



    getter_messages(): Observable<any> {
        return this.socket$ as Observable<any>;
    }



    setter_arr_clients() {

    }



    getter_cients() {
        return this.arr_clients;
    }

}