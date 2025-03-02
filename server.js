const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Healifi Server!");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
