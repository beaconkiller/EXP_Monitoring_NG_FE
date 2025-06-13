import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class repo_jenis_pembayaran{
    static spawn_box:boolean = false;
    static obj_jenis_pemb:any =  null;


        
    set_jenis_pemb(data:any | null = null){
        repo_jenis_pembayaran.obj_jenis_pemb = data;
    }



    get_jenis_pemb(){
        return repo_jenis_pembayaran.obj_jenis_pemb;
    }



};