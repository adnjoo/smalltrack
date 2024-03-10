import express, { type Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ClerkExpressWithAuth, LooseAuthProp } from "@clerk/clerk-sdk-node";
import { getIGPosts, upsertIGPost } from "./controllers/instagramController";
import { getToDos, upsertToDo } from "./controllers/todoController";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

declare global {
  namespace Express {
    interface Request extends LooseAuthProp {}
  }
}

app.get("/", (req, res) => {
  res.send({
    message: "Hello World",
  });
});

app.get("/ig/posts", ClerkExpressWithAuth({}), getIGPosts);
app.post("/ig/upsert", ClerkExpressWithAuth({}), upsertIGPost);

app.get("/todos", ClerkExpressWithAuth({}), getToDos);
app.post("/todos/upsert", ClerkExpressWithAuth({}), upsertToDo);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
