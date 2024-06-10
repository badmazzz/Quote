import React, { useState, useEffect } from "react";
import axios from "axios";
import QuoteCard from "./QuoteCard";
import SavedQuotes from "./SavedQuotes";
import "./QuoteApp.css";

const QuoteApp = () => {
  const [quote, setQuote] = useState("");
  const [savedQuotes, setSavedQuotes] = useState([]);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await axios.get(
        "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
      );
      setQuote(response.data[0]);
    } catch (error) {
      console.error("Error fetching the quote", error);
    }
  };

  const saveQuote = (quote) => {
    setSavedQuotes([...savedQuotes, quote]);
  };

  return (
    <div className="quote-app">
      <h1>Quotes</h1>
      <QuoteCard quote={quote} onSave={saveQuote} />
      <button onClick={fetchQuote}>New Quote</button>
      <SavedQuotes quotes={savedQuotes} />
    </div>
  );
};

export default QuoteApp;
