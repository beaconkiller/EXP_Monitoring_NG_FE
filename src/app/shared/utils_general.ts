export function get_user_code() {
    let userDtl =  localStorage.getItem('user_dtl');
    if(userDtl){
        let x = JSON.parse(userDtl) 
        return x['data'][0]['EMPL_CODE'];
    }
}

export function get_user_detail() {
    let userDtl =  localStorage.getItem('user_dtl');
    if(userDtl){
        return JSON.parse(userDtl)['data'][0];
    }
}