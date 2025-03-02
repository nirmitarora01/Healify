const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, "frontend")));

// Route to serve the home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
