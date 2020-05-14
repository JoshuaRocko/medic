const express = require("express");
const bodyParser = require("body-parser");
const scraper = require("./scraper");
const pool = require("./database");

const app = express();

app.get("/search/:med", async (req, res) => {
  const data = await scraper.search(req.params.med);
  res.json(data);
});

app.get("/users", (req, res) => {
  pool.query("select * from users", (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

app.post("/create/:email/:username/:pass", (req, res) => {
  pool.query(
    `insert into users (username, email, pass) values ('${req.params.username}', '${req.params.email}', MD5('${req.params.pass}'));`,
    (error, result) => {
      if (error) throw error;
      res.json(result);
    }
  );
});

app.get("/user/:username", (req, res) => {
  pool.query(
    `select * from users where username= '${req.params.username}'`,
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;
