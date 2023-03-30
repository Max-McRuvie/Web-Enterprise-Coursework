import React, { useEffect, useState } from 'react'
import { getQuoteList } from '../features/quote/quote-api'

const QuoteList = () => {
    const [quoteList, setQuoteList] = useState([])

    useEffect(() => {
        console.log("QuoteList mounted")
        getQuoteList()
            .then((response) => {
                console.log(response)
                setQuoteList(response)
            }
        )
    }, [])
    
    return (
        <div>
            <h1>Quote List</h1>
            {quoteList.map((quote) => (
                <div key={quote._id}>
                    <h2>{quote.title}</h2>
                    <p>{quote.total_cost}</p>
                </div>
            ))}


        </div>
    )
}

export default QuoteList
