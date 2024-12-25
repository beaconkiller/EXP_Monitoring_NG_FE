export function get_user_code() {
    let x = localStorage.getItem('user_dtl');
    return JSON.parse(x!);
}