export function get_user_code() {
    let userDtl =  localStorage.getItem('user_dtl');
    if(userDtl){
        let x = JSON.parse(userDtl) 
        return x['data'][0]['EMPL_CODE'];
    }
}

export function get_user_detail() {
    console.log('\n ============== GET USER DETAIL ================ \n')
    let userDtl_str =  localStorage.getItem('user_dtl')!;
    let userDtl = JSON.parse(userDtl_str)['data'][0];

    // console.log(userDtl);

    if(userDtl){
        return userDtl;
    }
}