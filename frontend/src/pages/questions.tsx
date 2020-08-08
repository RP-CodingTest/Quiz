import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const { REACT_APP_API_URI, REACT_APP_API_URI_QUESTIONS } = process.env;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(3),
        width: "25ch",
        color: "white",
      },
    },
  })
);

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
  const classes = useStyles();
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

  const clear = () => {
    setName("");
    setNameCompleted(false);
    setQuestion(0);
    setScore(0);
    setValue(null);
  };

  useEffect(() => {
    fetchData(url, setData, setLoading);
  }, []);

  if (!nameCompleted) {
    return (
      <>
        <Typography className={classes.root} variant="h2">
          Welcome to OYNB!!
        </Typography>
        <TextField
          label="What is your name"
          variant="filled"
          value={name}
          className={classes.root}
          onChange={handleNameChange}
        />
        <Button
          name="setName"
          variant="contained"
          color="primary"
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
        <Typography className={classes.root} variant="h4">
          Points so far: {score}
        </Typography>
        <FormControl className={classes.root} component="fieldset">
          <FormLabel component="legend">{data[question].Question}</FormLabel>
          <RadioGroup
            aria-label="question"
            name="question"
            value={value}
            className={classes.root}
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
          variant="contained"
          color="primary"
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
      <Typography className={classes.root} variant="h4">
        Thank you {name}!!
      </Typography>
      <div className={classes.root}>
        You scored {score} points out of {6 * data.length} possible.
      </div>
      <Button variant="contained" color="primary" onClick={() => clear()}>
        Try again
      </Button>
    </>
  );
}

export default App;
