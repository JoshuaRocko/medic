const express = require("express");
const bodyParser = require("body-parser");
const scraper = require("./scraper");
const pool = require("./database");
const puppeteer = require("puppeteer");
const { reset } = require("nodemon");

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

app.post("/addhistory", (req, res) => {
  const idUser = req.body.idUser;
  const med = req.body.med;
  const idMed = req.body.idMed;
  pool.query(
    `insert into historial values ('${med}', ${idMed} ,${idUser})`,
    (error, result) => {
      if (error) res.send({});
      res.send(result);
    }
  );
});

app.post("/like", (req, res) => {
  const idUser = req.body.idUser;
  const idProd = req.body.idProd;
  pool.query(
    `insert into likes (idProd, idUser) values (${idProd}, ${idUser})`,
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
});

app.post("/unlike", (req, res) => {
  const idUser = req.body.idUser;
  const idProd = req.body.idProd;
  pool.query(
    `delete from likes where idProd = ${idProd} AND idUser = ${idUser}`,
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

app.get("/existeMed/:med", (req, res) => {
  const med = req.params.med;
  pool.query(
    `select idMed from medicamento where nombreMed=lower('${med}')`,
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
});

app.get("/getProducts/:med", async (req, res) => {
  pool.query(
    `SELECT nombreProd as 'desc', precio, srcImgProd as img, srcUrlProd as link, tienda, idProd as idm FROM producto where idMed = (select idMed from medicamento where nombreMed = '${req.params.med}');`,
    (error, result) => {
      if (error) throw error;
      console.log(result);
      res.send(result);
    }
  );
});

app.get("/scrapeProducts/:med", async (req, res) => {
  const med = req.params.med;
  const data = await scraper.search(med, p);
  await insertaMed(data, med);
  res.send(data);
});

async function insertaMed(data, med) {
  pool.query(
    `insert into medicamento (nombreMed) values ('${med}')`,
    (error, result) => {
      if (error) throw error;
      console.log(result);
    }
  );
  for (let i = 0; i < data.length; i++) {
    let obj = data[i];
    let datos = [];
    for (let key in obj) {
      let value = obj[key];
      datos.push(value);
    }
    pool.query(
      `INSERT INTO producto(nombreProd, precio, srcImgProd, srcUrlProd, tienda, idMed) VALUES ('${datos[0]}', '${datos[1]}', '${datos[2]}', '${datos[3]}', '${datos[4]}', (select idMed from medicamento where nombreMed = '${med}'));`,
      (error, result) => {
        if (error) throw error;
        console.log(result);
      }
    );
    datos = [];
  }
}

/* CONFIG EXPRESS */

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;
