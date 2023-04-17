// Description: This file exports functions for calculating, saving, updating, deleting and getting quotes.

// Import axios
import axios from "axios";

// This function is used to calculate a quote
const calculateQuote = (quote) => {
  let item = sessionStorage.getItem("auth");
  const data = JSON.parse(item);
  return axios
    .post(`http://localhost:3000/api/calculation`, quote, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    })
    .then((response) => {
      return response.data.finalQuote;
    });
};

// This function is used to save a quote
const saveQuote = (quote) => {
  let item = sessionStorage.getItem("auth");
  const data = JSON.parse(item);
  let userID = data.user._id;

  let requestData = {
    uID: userID,
    title: quote.title,
    manHours: quote.manHours,
    workers: quote.workers,
    physicalResources: quote.physicalResources,
    totalCost: quote.totalCost,
  };

  try {
    return axios
      .post(`http://localhost:3000/api/quotes`, requestData, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        return response.data;
      });
  } catch (err) {
    console.log(err);
  }
};

// This function is used to get a singular quote by id
const getQuote = (quoteId) => {
  let item = sessionStorage.getItem("auth");
  const data = JSON.parse(item);
  let userId = data.user._id;

  return axios
    .get(`http://localhost:3000/api/quotes/${quoteId}/${userId}`, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

// This function is used get a list of quotes by user id
const getQuoteList = () => {
  let item = sessionStorage.getItem("auth");
  const data = JSON.parse(item);
  let userID = data.user._id;

  return axios
    .get(`http://localhost:3000/api/quotes/${userID}`, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

// This function is used to update a quote by id
const updateQuote = (quoteId, quote) => {
  let item = sessionStorage.getItem("auth");
  const data = JSON.parse(item);
  let userId = data.user._id;

  return axios
    .put(`http://localhost:3000/api/quotes/${quoteId}/${userId}`, quote, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

// This function is used to combine quotes into one quote
const combineQuotes = (quoteIds) => {
  let item = sessionStorage.getItem("auth");
  const data = JSON.parse(item);
  let userId = data.user._id;

  try {
    return axios
      .post(
        `http://localhost:3000/api/quotes/${userId}`,
        { quoteIds: quoteIds },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      )
      .then((response) => {
        return response.data;
      });
  } catch (err) {
    console.log(err);
  }
};

// This function is used to delete either singular quotes, or multiple quotes at once by id
const deleteQuote = (quoteIds) => {
  let item = sessionStorage.getItem("auth");
  const data = JSON.parse(item);
  let userId = data.user._id;

  // If only one quote is being deleted, convert it to an array
  // this makes the backend code simpler
  if (!Array.isArray(quoteIds)) {
    quoteIds = [quoteIds];
  }

  // Delete the quote(s)
  try {
    return axios
      .delete(`http://localhost:3000/api/quotes/${userId}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        data: { quoteIds: quoteIds },
      })
      .then((response) => {
        return response.data;
      });
  } catch (err) {
    console.log(err);
  }
};

// Export the functions
export {
  saveQuote,
  getQuote,
  getQuoteList,
  updateQuote,
  combineQuotes,
  calculateQuote,
  deleteQuote,
};
