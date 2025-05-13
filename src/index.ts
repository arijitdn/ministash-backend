import express from "express";
import env from "./lib/env";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    message: "API Healthy",
  });
});

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});
