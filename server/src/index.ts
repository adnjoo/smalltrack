import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { getIGPosts, upsertIGPost } from "./controllers/instagramController";

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

app.get("/ig/posts", getIGPosts);
app.post("/ig/upsert", upsertIGPost);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
