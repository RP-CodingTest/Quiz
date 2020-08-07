import { readFileSync } from "fs";
import parseCsv from "csv-parse/lib/sync";

export interface QuestionEntries {
  Question: String;
  "6 points": String;
  "4 points": String;
  "2 points": String;
  "0 points": String;
}

export default function parse(): QuestionEntries[] {
  try {
    const data = readFileSync("./data/questions.csv", { encoding: "utf-8" });

    return parseCsv(data, {
      columns: true,
      skip_empty_lines: true,
    });
  } catch (error) {
    console.error("Failed to read questions CSV");
    console.error(error);
    process.exit(1);
  }
}
