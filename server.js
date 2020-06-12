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
  
  await insertaMed(req.params.med);
  
  pool.query(
    `SELECT nombreProd as 'desc', precio, srcImgProd as img, srcUrlProd as link, tienda FROM producto where idMed = (select idMed from medicamento where nombreMed = '${req.params.med}');`,
    (error, result) => {
      if (error) throw error;
      //console.log(result);
      res.json(result)
    }
  );
  //console.log(data);
  //res.end();
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


function existeMed(med) {
  return new Promise((resolve, reject)=> {
      pool.query(`select idMed from medicamento where nombreMed =lower('${med}')`,
      (error, result) => {
        if (error) throw error;
        console.log(result);
        if (!result.length)
          return 0;
        else return 1;
      });
  })
}

async function insertaMed(med){
  var rows;
  console.log("pregunta si existe med en base");
  // await pool.query(
  //   `select idMed from medicamento where nombreMed =lower('${med}')`,
  //   (error, result) => {
  //     if (error) throw error;
  //     console.log(result);
  //     rows = result.length;
  //   }
  // );
  //
  
  //rows = await existeMed();

  console.log("rows",rows);
  //if(rows == 0){ ///////////
    console.log("no exixste ");
    pool.query(
      `insert into medicamento (nombreMed) values ('${med}')`,
      (error, result) => {
        if (error) throw error;
        console.log(result);
      }
    );
    const data = await scraper.search(med, p);
    for (var i = 0; i < data.length; i++){
      var obj = data[i];
      var datos = [];
      for (var key in obj){
        var value = obj[key];
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
 // }
}
/* CONFIG EXPRESS */

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;
