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

    authenticate(userData) {
        sessionStorage.setItem("auth", JSON.stringify(userData))
    },

    clearToken(callback) {
        sessionStorage.removeItem("auth")
    }
}

export default auth 

            

