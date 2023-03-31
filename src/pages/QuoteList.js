import React, { useEffect, useState } from 'react'
import { getQuoteList, deleteQuote } from '../features/quote/quote-api'

const QuoteList = () => {
    const [quoteList, setQuoteList] = useState([])
    const [selectedQuotes, setSelectedQuotes] = useState([])

    useEffect(() => {
        console.log("QuoteList mounted")
        getQuoteList()
            .then((response) => {
                console.log(response)
                setQuoteList(response)
            }
        )
    }, [])

    const handleToggleQuote = (quoteId) => {
        const newSelectedQuotes = [...selectedQuotes]
        const index = newSelectedQuotes.indexOf(quoteId)
        if (index > -1) {
            newSelectedQuotes.splice(index, 1)
        } else {
            newSelectedQuotes.push(quoteId)
        }
        setSelectedQuotes(newSelectedQuotes)
    }

    const handleDeleteQuote = () => {
        deleteQuote(selectedQuotes).then(() => {
            setQuoteList(quoteList.filter((quote) => !selectedQuotes.includes(quote._id)));
            setSelectedQuotes([]);
        })
    }
    
    return (
        <div>
            <h1>Quote List</h1>
            {quoteList.map((quote) => (
                <div key={quote._id}>
                     <input type="checkbox" onChange={() => handleToggleQuote(quote._id)} />
                    <h2>{quote.title}</h2>
                    <p>{quote.total_cost}</p>
                </div>
            ))}
            <button onClick={handleDeleteQuote}>Delete</button>
        </div>
    )
}

export default QuoteList
