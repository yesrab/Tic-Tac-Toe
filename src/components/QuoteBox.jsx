import React, { useEffect, useState } from "react";
import "../styles/QuoteBox.css";

import { useQuotes } from "../lib/useQuotes";

// const quoteUrl = "https://api.adviceslip.com/advice";

function QuoteBox() {
  const [signal, setSignal] = useState(null);
  const { quote, getQuote } = useQuotes();

  function fetchQuotes() {
    getQuote(signal);
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setSignal(signal);

    const t = setInterval(() => {
      fetchQuotes(signal);
    }, 60000);

    return () => {
      clearInterval(t);
      controller.abort();
    };
  }, []);

  return (
    <div className='quoteBox'>
      <h3>Quote #{quote.id}</h3>
      <p>{` “ ${quote.advice} ” `}</p>
      <button onClick={fetchQuotes}></button>
    </div>
  );
}

export default QuoteBox;
