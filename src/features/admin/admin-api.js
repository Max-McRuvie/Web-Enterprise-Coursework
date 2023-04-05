import axios from "axios";

const adjustPayGrades = async (payGrades) => {
    console.log("payGrades")
    let item = sessionStorage.getItem('auth');
    const data = JSON.parse(item)
    let userID = data.user._id
    
    return await axios.put(`http://localhost:3000/api/admin/paygrade/${userID}`, 
        payGrades,
        {
            headers: {
                'Authorization': `Bearer ${data.token}`
              }
        }
    )
    .then(response => {
        return response.data;
    });
};

const adjustFudgeFactor = (fudgeFactor) => {
    console.log("fudgeFactor")
    let item = sessionStorage.getItem('auth');
    const data = JSON.parse(item)
    let userID = data.user._id

    return axios.put(`http://localhost:3000/api/admin/fudge-factor/${userID}`,
        {fudgeFactor: fudgeFactor},
        {
            headers: {
                'Authorization': `Bearer ${data.token}`
              }
        }
    )
    .then(response => {
        return response.data;
    });
}

export {
    adjustPayGrades,
    adjustFudgeFactor,
}