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

const calculationWithoutFudgeFactor = (quote) => {
    let item = sessionStorage.getItem('auth');
    const data = JSON.parse(item)
    let userID = data.user._id

    let requestData = {
        uID: userID,
        title: quote.title,
        workers: quote.workers,
        physicalResources: quote.physicalResources,
        total_cost: quote.total_cost,
    }
    
    try{
        return axios.post(`http://localhost:3000/api/admin/fudge-factor/${userID}`, requestData, {
            headers: {
                'Authorization': `Bearer ${data.token}`
            }
        })
        .then(response => {
            console.log(response)
            return response.data.finalQuote;
        })
    } catch (err) {
        console.log(err)
    }
}

export {
    adjustPayGrades,
    calculationWithoutFudgeFactor
}