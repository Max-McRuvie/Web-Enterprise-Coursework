import axios from 'axios';

const signup = async (userData) => {
    let data = {"name": userData.name, "email": userData.email, "password" : userData.password}
    try{
        return await axios.post('http://localhost:3000/api/users', data).then(response => {
            console.log(response)
            return response.data;
        })
    }
    catch(error){
        console.log(error)
    }
}

const getProfile = () => {
    let item = sessionStorage.getItem('auth');
    const data = JSON.parse(item)
    let userID = data.user._id

    return axios.get(`http://localhost:3000/api/users/${userID}`, {
        headers: {
            'Authorization': `Bearer ${data.token}`
        }
    })
        .then(response => {
            return response.data;
        })

}

export {
    signup,
    getProfile
}