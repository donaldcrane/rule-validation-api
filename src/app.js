import express from "express";
import dotenv from "dotenv";
import RuleController from "./controllers/rateController";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const {rate, base} = RuleController;

app.use(express.json());

app.post("/validate-rule", rate);
app.get("/", base);



app.listen(port, () => {
  console.log(`Server Running on: ${port}`);
});

export default app;
