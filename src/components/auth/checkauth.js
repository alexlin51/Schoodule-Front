import Axios from 'axios';

export default async function checkLoggedIn () {
    // we want to first check if a token is in local storage
    let token = localStorage.getItem('auth-token');
    if (token === null){
        localStorage.setItem('auth-token', '');
        token = '';
    }
    // make an api call to auth
    const tokenRes = await Axios.post(
        'http://localhost:5000/user/auth', 
        null, 
        { headers: { 'X-Auth-Token': token } },
    );
    
    // now that we have the response, if false, we will send home.
    if (!tokenRes.data){
        window.location.href = '/';
    }
}