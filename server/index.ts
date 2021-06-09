import express, { Request, Response } from "express";
import { ROUTES } from "./routes";
import mongoose from "mongoose";
import cors from "cors";

const uri =
  "mongodb+srv://7umrud:!znGMsxeNY9@-k$@cluster0.mcz83.mongodb.net/myFirstDatabase";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const app = express();
app.use(cors());
app.use(express.json());
const port = 8080;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("db connected");
});

ROUTES.forEach(({ path, router }) => {
  app.use(path, router);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
