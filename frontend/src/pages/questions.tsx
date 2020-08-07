import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";

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
  const [name, setName] = useState("");
  const [nameCompleted, setNameCompleted] = useState(false);
  const [question, setQuestion] = useState(0);
  const [score, setScore] = useState<number>(0);
  const [value, setValue] = React.useState(null);

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    fetchData(url, setData, setLoading);
  }, []);

  if (!nameCompleted) {
    return (
      <>
        <div>Welcome to OYNB!!</div>
        <TextField
          label="What is your name"
          variant="filled"
          value={name}
          onChange={handleNameChange}
        />
        <Button
          onClick={() => {
            setNameCompleted(true);
          }}
        >
          Next
        </Button>
      </>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data === null) {
    return <div>No data found</div>;
  }

  if (question < data.length) {
    return (
      <>
        <div>Points so far: {score}</div>
        <FormControl component="fieldset">
          <FormLabel component="legend">{data[question].Question}</FormLabel>
          <RadioGroup
            aria-label="question"
            name="question"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="6"
              control={<Radio />}
              label={data[question]["6 points"]}
            />
            <FormControlLabel
              value="4"
              control={<Radio />}
              label={data[question]["4 points"]}
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label={data[question]["2 points"]}
            />
            <FormControlLabel
              value="0"
              control={<Radio />}
              label={data[question]["0 points"]}
            />
          </RadioGroup>
        </FormControl>
        <Button
          onClick={() => {
            setQuestion(question + 1);
            setScore(score + parseInt(value || "0", 10));
            setValue(null);
          }}
        >
          Next
        </Button>
      </>
    );
  }

  return (
    <>
      <div>Thank you {name}!!</div>
      <div>
        You scored {score} points out of {6 * data.length} possible.
      </div>
    </>
  );
}

export default App;
