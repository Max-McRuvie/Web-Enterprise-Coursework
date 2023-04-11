// Imports
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuote } from "../features/quote/quote-api.js";
import QuoteForm from "../components/Quotes/QuoteForm.js";

const EditQuote = () => {
  const { quoteId } = useParams();
  const currentQuoteId = quoteId;
  const [quote, setQuote] = useState({
    title: "",
    workers: [
      {
        hourlyRate: "",
        hoursRequired: "",
      },
    ],
    cost: "",
  });

  // Get quote from API using quiteID
  useEffect(() => {
    getQuote(quoteId).then((response) => {
      setQuote({
        title: response[0].title,
        workers: response[0].workers,
        physicalResources: response[0].physicalResources,
        cost: response[0].total_cost,
      });
    });
  }, [quoteId]);

  return <QuoteForm quote={quote} quoteID={currentQuoteId} edit={true} />;
};

export default EditQuote;
