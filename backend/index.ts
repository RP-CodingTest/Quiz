import express from "express";
import {Request, Response} from "express";

import parse from "./src/read";

const app = express();
const port = 3000;

app.get("/questions", (_req: Request, res: Response) => {
  res.send(parse());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
