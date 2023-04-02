import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuote } from '../features/quote/quote-api';
import QuoteForm from '../components/QuoteForm';

const EditQuote = () => {
    const { quoteId } = useParams();
    const currentQuoteId = quoteId;
    console.log(currentQuoteId)
    const [quote, setQuote] = useState({
        title: '',
        workers: [
            {
                hourlyRate: '',
                hoursRequired: '',
            },
        ],
        cost: '',
    })
    
    useEffect(() => {
        getQuote(quoteId)
            .then((response) => {
                setQuote({
                    title: response[0].title,
                    workers: response[0].workers,
                    cost: response[0].total_cost,
                })
            }
        )
    }, [quoteId])

    return (
        <QuoteForm quote={quote} quoteID={currentQuoteId} edit={true} />
    );
};

export default EditQuote;