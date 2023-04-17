// This page displays a list of quotes and allows the user to combine and remove quotes

// imports
import React, { useEffect, useState } from "react";
import {
  getQuoteList,
  saveQuote,
  combineQuotes,
  deleteQuote,
} from "../features/quote/quote-api.js";

import {
  Paper,
  Grid,
  Typography,
  Button,
  Container,
  Checkbox,
  styled
} from "@mui/material";
import { Link } from "react-router-dom";
import theme from "../theme.js";

// Theme colors
const { light, darkNavbar, contrastText } = theme.palette.primary;

// Styled component
const StyledButton = styled(Button)(({ theme, color = "primary" }) => ({
  backgroundColor: darkNavbar,
  color: contrastText,
  margin: "2%",
  "&:hover": {
    backgroundColor: light,
    color: darkNavbar,
    border: "1px solid",
  },
}));

const QuoteList = () => {
  const [quoteList, setQuoteList] = useState([]);
  const [selectedQuotes, setSelectedQuotes] = useState([]);
  const [combinedQuote, setCombinedQuote] = useState({
    title: "",
    manHours: 0,
    workers: [],
    physicalResources: [],
    total_cost: "",
  });
  const [showCombinedQuote, setShowCombinedQuote] = useState(false);

  // Get quote list
  useEffect(() => {
    getQuoteList().then((response) => {
      console.log(response)
      setQuoteList(response);
    });
  }, []);

  // Handle quote selection
  const handleToggleQuote = (quoteId) => {
    const newSelectedQuotes = [...selectedQuotes];
    const index = newSelectedQuotes.indexOf(quoteId);
    if (index > -1) {
      newSelectedQuotes.splice(index, 1);
    } else {
      newSelectedQuotes.push(quoteId);
    }
    setSelectedQuotes(newSelectedQuotes);
  };

  // Handle combine quotes
  const handleCombineQuotes = () => {
    if(selectedQuotes.length < 2) {
      alert("Please select at least 2 quotes to combine");
      return;
    }
    
    combineQuotes(selectedQuotes).then((response) => {
      setCombinedQuote({
        title: response.title,
        manHours: response.manHours,
        workers: response.workers,
        physicalResources: response.physicalResources,
        total_cost: response.total_cost,
      });
    });
    setShowCombinedQuote(true);
  };

  // Handle save combined quote
  const handleSave = async (e) => {
    e.preventDefault();
    console.log("Saving quote");
    await saveQuote(combinedQuote);
    alert("Quote saved");
    window.location.reload();
  };

  // Handle delete quote
  const handleDeleteQuote = () => {
    deleteQuote(selectedQuotes).then(() => {
      setQuoteList(
        quoteList.filter((quote) => !selectedQuotes.includes(quote._id))
      );
      setSelectedQuotes([]);
    });
  };

  return (
    <Container>
      <Grid container spacing={3} marginTop={"2%"}>
        {quoteList.map((quote) => (
          <Grid item xs={12} sm={6} md={4} key={quote._id}>
            <Paper elevation={3}>
              <Typography variant="h6">Title: {quote.title}</Typography>
              <Typography variant="body1">
                Manhours: {quote.manHours}
              </Typography>
              <Typography variant="body1">
                Workers: {quote.workers.length}
              </Typography>
              <Typography variant="body1">
               Physical Resources: {quote.physicalResources.length}
              </Typography>
              <Typography variant="body1">
                Total Cost: £{quote.total_cost}
              </Typography>
              <Checkbox
                checked={selectedQuotes.includes(quote._id)}
                onChange={() => handleToggleQuote(quote._id)}
                sx={{
                  color: darkNavbar,
                  "&.Mui-checked": { color: darkNavbar },
                }}
              />
              <div>
                <StyledButton component={Link} to={`/quote/${quote._id}`}>
                  Edit
                </StyledButton>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <StyledButton onClick={handleDeleteQuote}>Delete</StyledButton>
      <StyledButton onClick={handleCombineQuotes}>Combine</StyledButton>

      {showCombinedQuote ? (
        <div>
          <Typography variant="h6">Title: {combinedQuote.title}</Typography>
          <Typography variant="body1">
            Manhours: {combinedQuote.manHours}
          </Typography>
          <Typography variant="body1">
            Workers: {combinedQuote.workers.length}
          </Typography>
          <Typography variant="body1">
            Physical Resources: {combinedQuote.physicalResources.length}
          </Typography>
          <Typography variant="body1">
            Total Cost: £{combinedQuote.total_cost}
          </Typography>
          <Button
            variant="contained"
            sx={{ marginTop: "2%" }}
            onClick={handleSave}
          >
            Save Quote
          </Button>
        </div>
      ) : null}
    </Container>
  );
};

// export
export default QuoteList;
