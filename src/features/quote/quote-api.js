import axios from "axios";

const saveQuote = (quote) => {
    let item = sessionStorage.getItem('auth');
    const data = JSON.parse(item)
    let userID = data.user._id
    
    let requestData = {
        uID: userID,
        title: quote.title,
        workers: quote.workers,
    }

    console.log(requestData)

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

export {
    saveQuote,
}
