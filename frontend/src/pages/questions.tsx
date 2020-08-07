import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
    setLoading(false)  }

  useEffect(() => {
    fetchData()
  }, []);

  return {loading,data};
};

export interface QuestionEntries {
  Question: String;
  "6 points": String;
  "4 points": String;
  "2 points": String;
  "0 points": String;
}

function App() {

  const {loading, data} = useFetch("http://localhost:3001/questions");

  return (
    <div>
      {loading ? <div>Loading...</div> :
       <ul>
         Questions
       </ul>
      }
    </div>
  )
}

export default App;
