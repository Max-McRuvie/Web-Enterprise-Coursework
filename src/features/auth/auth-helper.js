// import {useDispatch} from 'react-redux';
// import { setAuthBool, unsetAuthBool } from '../state/auth/authReducer';

const auth = {
    isAuthenticated() {
        if(sessionStorage.getItem("auth")) {
            return JSON.parse(sessionStorage.getItem("auth"))
        }
        else {
            return false
        }
    },

    authenticate(token, callback) {
        sessionStorage.setItem("auth", JSON.stringify(token))
    },
}

export default auth 

            

