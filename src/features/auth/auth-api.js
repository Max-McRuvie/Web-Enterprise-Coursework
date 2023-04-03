import axios from "axios";

const signin = async (email, password) => {
    try{
        const response = await axios.post("http://localhost:3000/auth/signin/auth.signin", {
            email,
            password,
        });
        return response.data;
    }
    catch (err) {
        console.log(err)
    } 
}

const signout = async () => {
    try{
        const response = axios.get("http://localhost:3000/auth/signout");
        return response.data;
    }
    catch (err) {
        console.log(err)
    }
}

export {
    signin,
    signout,
};
