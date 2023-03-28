import axios from 'axios';

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
    getProfile
}