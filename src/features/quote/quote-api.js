import axios from "axios";

const calculateQuote = (quote) => {
    return axios.post(`http://localhost:3000/api/calculation`, quote)
        .then(response => {
            return response.data.finalQuote
        })
}

const saveQuote = (quote) => {
    let item = sessionStorage.getItem('auth');
    const data = JSON.parse(item)
    let userID = data.user._id
    
    let requestData = {
        uID: userID,
        title: quote.title,
        workers: quote.workers,
        total_cost: quote.total_cost,
    }

    try{
        return axios.post(`http://localhost:3000/api/quotes`, requestData)
        .then(response => {
            console.log(response)
            return response.data;
        })
    } catch (err) {
        console.log(err)
    }
}


const getQuoteList = () => {
    let item = sessionStorage.getItem('auth');
    const data = JSON.parse(item)
    let userId = data.user._id

    return axios.get(`http://localhost:3000/api/quotes/${userId}`)
    .then(response => {
      return response.data;
    });

}

export {
    saveQuote,
    getQuoteList,
    calculateQuote
}
