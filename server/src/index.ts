import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({
    message: "Hello World",
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
