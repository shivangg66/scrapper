import express, { json } from "express";
import { api } from "./routes";

const app = express();

app.use(json());

app.use("/", api);

app.listen(3000, () => {
  console.log(`server started`);
});
