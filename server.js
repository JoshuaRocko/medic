const express = require("express");
const bodyParser = require("body-parser");
const scraper = require("./scraper");
const pool = require("./database");

var puppeteer = require("puppeteer");

const app = express();

var p;

(async()=> {
  const browser= await puppeteer.launch();
  p = await browser.newPage();


  p.on('error', err=> {
    console.log('error happen at the page: ', err);
  });

  p.on('pageerror', pageerr=> {
    console.log('pageerror occurred: ', pageerr);
  })
})();


app.get("/search/:med", async (req, res) => {
  const data = await scraper.search(req.params.med, p);
  res.json(data);
  const info = await scraper.getInfo(req.params.med, p);
  inf.json(info);
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
