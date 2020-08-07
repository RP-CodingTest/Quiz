import express from "express";
import {Request, Response} from "express";

import parse from "./src/read";

const app = express();
const { PORT } = process.env;

app.get("/questions", (_req: Request, res: Response) => {
  res.send(parse());
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
