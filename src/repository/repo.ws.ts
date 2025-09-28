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
        // console.log(msg);

        if (msg['type'] == 'get_clients') {
            this.map_clients(msg['message']);
        }

        if (msg['type'] == 'give_storage') {
            this.set_storage(msg);
        }

        if (msg['type'] == 'server_info') {
            this.set_server_info(msg);
        }
    }


    map_clients(arr_clients: any) {
        console.log(arr_clients)

        arr_clients.forEach((el: any) => {
            this.arr_clients.set(el['device_id'], {
                device_id: el['device_id'],
                arr_storage: null,
                summary_storage: null,
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
        console.log(`get storage : ${device_id}`);
        this.send({
            type: 'get_storage',
            payload: device_id,
        })
    }



    get_storage_all() {
        console.log(this.arr_clients);

        this.arr_clients.forEach((el: any) => {
            this.get_storage(el['device_id']);
        })
    }



    set_server_info(msg: any) {
        // console.log(msg);

        let device_id = msg['device_id'];
        let server_info = JSON.parse(msg['message']);

        // console.log(server_info);

        let act_client = this.arr_clients.get(device_id);
        if (act_client) {
            const newObj = { ...act_client, server_info };
            this.arr_clients.set(device_id, newObj);
            // console.log(this.arr_clients);
        }
    }



    set_storage(msg: any) {
        let arr_storage = this.rwp.parse_storage(msg['message']);
        let act_obj = this.arr_clients.get(msg['device_id']);
        let summary_storage = this.rwp.get_summary_storage(arr_storage)

        const newObj = { ...act_obj, arr_storage, summary_storage };

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



    getter_client_by_id(device_id: any) {
        return this.arr_clients.get(device_id);
    }

}