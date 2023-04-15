// Description: This page is used to edit a quote

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
    manHours: "",
    workers: [
      {
        name: "",
        hourlyRate: "",
        hoursRequired: "",
      },
    ],
    physicalResources: [
      {
        title: "",
        cost: "",
      },
    ],
    total_cost: "",
  });

  // Get quote from API using quiteID
  useEffect(() => {
    getQuote(quoteId).then((response) => {
      setQuote({
        title: response[0].title,
        manHours: response[0].manHours,
        workers: response[0].workers,
        physicalResources: response[0].physicalResources,
        total_cost: response[0].total_cost,
      });
    });
  }, [quoteId]);

  return <QuoteForm quote={quote} quoteID={currentQuoteId} edit={true} />;
};

// Export
export default EditQuote;
