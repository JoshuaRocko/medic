const express = require("express");
const bodyParser = require("body-parser");
const scraper = require("./scraper");
const pool = require("./database");
const puppeteer = require("puppeteer");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* SCRAPER */
let p;

(async () => {
  const browser = await puppeteer.launch();
  p = await browser.newPage();
  await p.setDefaultTimeout(45000);
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

app.get("/info/:med", async (req, res) => {
  const info = await scraper.getInfo(req.params.med, p);
  res.json(info);
});

/* QUERIES */

app.post("/adduser", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  pool.query(
    `insert into users (username, email, pass) values (lower('${username}'), lower('${email}'), MD5('${password}'));`,
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

app.get("/login/:username", (req, res) => {
  pool.query(
    `select * from users where username=lower('${req.params.username}')`,
    (error, result) => {
      if (error) throw error;
      console.log(result);
      res.send({
        userExists: result.length > 0,
        result: result,
      });
    }
  );
});

/* CONFIG EXPRESS */

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;
