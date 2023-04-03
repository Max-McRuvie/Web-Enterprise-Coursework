import axios from "axios";

const signin = async ( userData) => {
    const { email, password } = userData;
    try{
        const response = await axios.post("http://localhost:3000/auth/signin", {
            email,
            password,
        });
        console.log(response.data)
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
