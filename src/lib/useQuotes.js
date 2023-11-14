import { useState, useEffect } from "react";

const QUOTE_URL = "https://api.adviceslip.com/advice";

export const useQuotes = () => {
  const [quote, setQuote] = useState({
    id: "O",
    advice: "Loading",
  });

  const getQuote = async (signal) => {
    try {
      const responce = await fetch(QUOTE_URL, { signal });
      const result = await responce.json();
      setQuote(result?.slip);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getQuote(signal);
    return () => {
      controller.abort();
    };
  }, []);

  return { quote, getQuote };
};
