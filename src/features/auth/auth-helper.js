// import {useDispatch} from 'react-redux';
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

    clearToken(callback) {
        sessionStorage.removeItem("auth")
    }
}

export default auth 

            

