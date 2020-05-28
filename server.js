const express = require("express");
// const bodyParser = require("body-parser");
const scraper = require("./scraper");
const pool = require("./database");
const puppeteer = require("puppeteer");

const app = express();

let p;

(async () => {
  const browser = await puppeteer.launch();
  p = await browser.newPage();

  p.on("error", (err) => {
    console.log("error happen at the page: ", err);
  });

  p.on("pageerror", (pageerr) => {
    console.log("pageerror occurred: ", pageerr);
  });
})();

app.get("/search/:med", async (req, res) => {
  const data = await scraper.search(req.params.med, p);
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
    `insert into users (username, email, pass) values (lower('${req.params.username}'), lower('${req.params.email}'), MD5('${req.params.pass}'));`,
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
});

app.get("/verifyuser/:username/:email", (req, res) => {
  pool.query(
    `select * from users where (username=lower('${req.params.username}') or email=lower('${req.params.email}'))`,
    (error, result) => {
      if (error) throw error;
      res.send({
        userExists: result.length > 0,
      });
    }
  );
});

app.get("/info/:med", async (req, res) => {
  const info = await scraper.getInfo(req.params.med, p);
  res.json(info);
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;
