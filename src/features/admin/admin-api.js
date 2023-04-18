// Description: This file contains the API calls for the admin page

// Import axios
import axios from "axios";

const getPaygradeSettings = async () => {
  let item = sessionStorage.getItem("auth");
  const data = JSON.parse(item);
  let userID = data.user._id;

  return await axios
    .get(`http://localhost:3000/api/admin/paygrade/${userID}`, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

// This function is used to adjust the pay grades
const adjustPayGrades = async (payGrades) => {
  let item = sessionStorage.getItem("auth");
  const data = JSON.parse(item);
  let userID = data.user._id;

  return await axios
    .put(`http://localhost:3000/api/admin/paygrade/${userID}`, payGrades, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

// This function is used to calculate the quote without the fudge factor
const calculationWithoutFudgeFactor = (quote) => {
  let item = sessionStorage.getItem("auth");
  const data = JSON.parse(item);
  let userID = data.user._id;

  // Create the request data by pulling the data from the quote object and adding the user id
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
      .post(
        `http://localhost:3000/api/admin/fudge-factor/${userID}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      )
      .then((response) => {
        return response.data.finalQuote;
      });
  } catch (err) {
    console.log(err);
  }
};

// Export the functions
export { getPaygradeSettings, adjustPayGrades, calculationWithoutFudgeFactor };
