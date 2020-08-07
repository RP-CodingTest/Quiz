import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";

const { REACT_APP_API_URI, REACT_APP_API_URI_QUESTIONS } = process.env;

export interface QuestionEntries {
  Question: String;
  "6 points": String;
  "4 points": String;
  "2 points": String;
  "0 points": String;
}

async function fetchData(url: string, setData: Function, setLoading: Function) {
  const response = await fetch(url);
  const json = await response.json();
  setData(json);
  setLoading(false);
}

function App() {
  const url = `${REACT_APP_API_URI}${REACT_APP_API_URI_QUESTIONS}`;
  const [data, setData] = useState<QuestionEntries[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState(0);

  useEffect(() => {
    fetchData(url, setData, setLoading);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data === null) {
    return <div>No data found</div>;
  }

  if (question < data.length) {
    return (
      <>
        <div>{data[question].Question}</div>
        <Button onClick={() => setQuestion(question + 1)}>Next</Button>
      </>
    );
  }

  return (
    <>
      <div>Results</div>
    </>
  );
}

export default App;
