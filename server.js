const express = require("express");
const bodyParser = require("body-parser");
const scraper = require("./scraper");

const app = express();

app.get("/search/:med", async (req, res) => {
  const data = await scraper.search(req.params.med);
  res.json(data);
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
