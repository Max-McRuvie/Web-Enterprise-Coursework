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
    },

    isAdmin() {
        if(sessionStorage.getItem("auth")) {
            return JSON.parse(sessionStorage.getItem("auth")).user.admin === true
        }
        else {
            return false
        }
    }
        
}

export default auth 

            

