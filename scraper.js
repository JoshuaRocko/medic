var puppeteer = require("puppeteer");
async function searchFarN(med, page) {
  try {
    await page.goto(`https://farmaciasdelnino.mx/esp/items/?kw=` + med);
    await scrollToBottom(page);
    await delay(3000);

    const titles = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(
          "div#catalogo > .productos > div.descripcion > h2 , div#catalogo > .productosultimo >div.descripcion > h2"
        )
      )
        .map((partner) => partner.innerText.trim())
        .splice(0, 6)
    );
    const prices = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(
          "div#catalogo > .productos > div.precio .oferta, div#catalogo > .productosultimo > div.precio .oferta "
        )
      )
        .map((partner) => partner.innerText.trim())
        .splice(0, 6)
    );

    const imgs = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(
          "div#catalogo > .productos > .foto > a > img, 	div#catalogo > .productosultimo > .foto > a > img"
        )
      )
        .map((img) => img.src)
        .splice(0, 6)
    );
    const links = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(
          "div#catalogo > .productos > div.descripcion > h2 > a, div#catalogo > .productosultimo >div.descripcion > h2 > a"
        )
      )
        .map((partner) => partner.href)
        .splice(0, 6)
    );
    let arr = [];
    arr.push(titles, prices, imgs, links, ["Farmacias del niño"]);

    return arr;
  } catch (e) {
    console.log(e);
    let arrEr = [];
    let arrEmt = [];
    arrEr.push(arrEmt, arrEmt, arrEmt, arrEmt);
    return arrEr;
  }
}

async function searchFarGi(med, page) {
  try {
    await page.goto(
      `https://farmaciasgi.com.mx/?s=` + med + `+&post_type=product`
    );

    const titles = await page.evaluate(() =>
      Array.from(document.querySelectorAll("div.cajaProd > h3"))
        .map((partner) => partner.innerText.trim())
        .splice(0, 6)
    );
    const prices = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".prodDescCorta > b > .amount"))
        .map((partner) => partner.innerText.trim())
        .splice(0, 6)
    );

    const imgs = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".cajaProd > a > img"))
        .map((img) => img.src)
        .splice(0, 6)
    );
    const links = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".cajaProd> a"))
        .map((partner) => partner.href)
        .splice(0, 6)
    );
    let arr = [];
    arr.push(titles, prices, imgs, links, ["Farmacias Gi"]);

    return arr;
  } catch (e) {
    console.log(e);
    let arrEr = [];
    let arrEmt = [];
    arrEr.push(arrEmt, arrEmt, arrEmt, arrEmt);
    return arrEr;
  }
}

async function searchSup(med, page) {
  try {
    await page.goto(`https://www.superama.com.mx/buscar/d-farmacia/` + med);

    const titles = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(".text-elipsis.nombreProductoDisplay")
      )
        .map((partner) => partner.innerText.trim())
        .splice(0, 6)
    );
    const prices = await page.evaluate(() =>
      Array.from(document.querySelectorAll("p.upcPrice"))
        .map((partner) => partner.innerText.trim())
        .splice(0, 6)
    );

    const imgs = await page.evaluate(() =>
      Array.from(document.querySelectorAll("img.lazyload"))
        .map((img) => img.src)
        .splice(0, 6)
    );
    const links = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll("a.text-elipsis.nombreProductoDisplay")
      )
        .map((partner) => partner.href)
        .splice(0, 6)
    );
    let arr = [];
    arr.push(titles, prices, imgs, links, ["Superama"]);

    return arr;
  } catch (e) {
    console.log(e);
    let arrEr = [];
    let arrEmt = [];
    arrEr.push(arrEmt, arrEmt, arrEmt, arrEmt);
    return arrEr;
  }
}

async function searchFarSP(med, page) {
  try {
    await page.goto(`https://www.farmaciasanpablo.com.mx/search/?text=` + med);

    const titles = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(".col-xs-7.col-sm-7.col-md-12> a > p")
      )
        .map((partner) => partner.innerText.trim())
        .splice(0, 6)
    );
    const prices = await page.evaluate(() =>
      Array.from(document.querySelectorAll("p.item-prize"))
        .map((partner) => partner.innerText.trim())
        .splice(0, 6)
    );
    for (i = 0; i < prices.length; i++) {
      prices[i] = prices[i].split(" ")[0];
    }
    await delay(3000);
    const imgs = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(
          ".col-xs-5.col-sm-5.col-md-12.img-wrap > a > img"
        )
      )
        .map((img) => img.src)
        .splice(0, 6)
    );
    const links = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(".col-xs-5.col-sm-5.col-md-12.img-wrap > a")
      )
        .map((partner) => partner.href)
        .splice(0, 6)
    );
    let arr = [];
    arr.push(titles, prices, imgs, links, ["Farmacia San Pablo"]);

    return arr;
  } catch (e) {
    console.log(e);
    let arrEr = [];
    let arrEmt = [];
    arrEr.push(arrEmt, arrEmt, arrEmt, arrEmt);
    return arrEr;
  }
}
async function searchChe(med, page) {
  try {
    await page.goto(
      `https://www.chedraui.com.mx/search?q=` +
        med +
        `%3Arelevance%3Acategory_l_1%3AMC24&text=` +
        med +
        `&toggleView=grid`
    );

    const titles = await page.evaluate(() =>
      Array.from(document.querySelectorAll("a.name"))
        .map((partner) => partner.innerText.trim())
        .splice(0, 6)
    );
    const prices = await page.evaluate(() =>
      Array.from(document.querySelectorAll("div.product__list--price-panel"))
        .map((partner) => partner.innerText.trim())
        .splice(0, 6)
    );

    const imgs = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(
          "div.plp-product-thumb > img:not([class='PLP-promotion-icon'])"
        )
      )
        .map((img) => img.src)
        .splice(0, 6)
    );
    const links = await page.evaluate(() =>
      Array.from(document.querySelectorAll("a.name"))
        .map((partner) => partner.href)
        .splice(0, 6)
    );
    let arr = [];
    arr.push(titles, prices, imgs, links, ["Chedraui"]);

    return arr;
  } catch (e) {
    console.log(e);
    let arrEr = [];
    let arrEmt = [];
    arrEr.push(arrEmt, arrEmt, arrEmt, arrEmt);
    return arrEr;
  }
}

async function searchAmz(med, page) {
  try {
    await page.goto(
      "https://www.amazon.com.mx/s?k=" +
        med +
        "&i=hpc&rh=n%3A9482610011%2Cn%3A9845666011&dc&__mk_es_MX=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2R9XBQJTG9UO6&qid=1588095115&rnid=9482611011&sprefix=ibu%2Chpc%2C247&ref=sr_nr_n_10"
    );
    const title = await page.evaluate(
      () => document.querySelector("h2").innerText
    );
    const img = await page.evaluate(
      () =>
        document.querySelector(
          ".a-section.aok-relative.s-image-square-aspect > img"
        ).src
    );
    const price = await page.evaluate(() =>
      document.querySelector(".a-offscreen").innerText.trim()
    );
    const link = await page.evaluate(
      () => document.querySelector("h2").children[0].href
    );
    const titles = [title];
    const prices = [price];
    const imgs = [img];
    const links = [link];
    let arr = [];
    arr.push(titles, prices, imgs, links, ["Amazon"]);

    return arr;
  } catch (e) {
    console.log(e);
    let arrEr = [];
    let arrEmt = [];
    arrEr.push(arrEmt, arrEmt, arrEmt, arrEmt);
    return arrEr;
  }
}
async function searchFaho(med, page) {
  try {
    await page.goto("https://www.fahorro.com/catalogsearch/result/?q=" + med);
    const titles = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(".product-shop > h2")
      ).map((partner) => partner.innerText.trim())
    );
    const prices = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".price")).map((partner) =>
        partner.innerText.trim()
      )
    );
    const imgs = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".product-image > img")).map(
        (img) => img.src
      )
    );

    const links = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".product-name > a")).map(
        (partner) => partner.href
      )
    );
    let arr = [];
    arr.push(titles, prices, imgs, links, ["Farmacias del ahorro"]);

    return arr;
  } catch (e) {
    console.log(e);
    let arrEr = [];
    let arrEmt = [];
    arrEr.push(arrEmt, arrEmt, arrEmt, arrEmt);
    return arrEr;
  }
}

async function search(m, p) {
  m = m.trim();
  m = m.replace(/ /g, "+");
  let prod = [];

  const pA = await searchFaho(m, p);
  //const pA = await searchAmz(m, p);
  const pC = await searchChe(m, p);
  const pFN = await searchFarN(m, p);
  const pFS = await searchFarSP(m, p);
  const pS = await searchSup(m, p);
  //const pG = await searchFarGi(m,p);

  const titles = pA[0].concat(pC[0], pFS[0], pFN[0], pS[0]); //,pG[0]);
  const prices = pA[1].concat(pC[1], pFS[1], pFN[1], pS[1]); //,pG[1]);
  const imgs = pA[2].concat(pC[2], pFS[2], pFN[2], pS[2]); //,pG[2]);
  const links = pA[3].concat(pC[3], pFS[3], pFN[3], pS[3]); //,pG[3]);

  const resultados = [pA, pC, pFN, pFS, pS];

  for (let i = 0; i < resultados.length; i++) {
    for (let j = 0; j < resultados[0].length; j++) {
      let resultado = new Object();
      resultado.desc = resultados[i][0][j];
      resultado.precio = resultados[i][1][j];
      resultado.img = resultados[i][2][j];
      resultado.link = resultados[i][3][j];
      resultado.tienda = resultados[i][4][0];
      prod.push(resultado);
    }
  }

  return prod;
}

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

async function scrollToBottom(page) {
  const distance = 100; // should be less than or equal to window.innerHeight
  const delay = 100;
  while (
    await page.evaluate(
      () =>
        document.scrollingElement.scrollTop + window.innerHeight <
        document.scrollingElement.scrollHeight
    )
  ) {
    await page.evaluate((y) => {
      document.scrollingElement.scrollBy(0, y);
    }, distance);
    await page.waitFor(delay);
  }
}

async function getInfo(med, page) {
  try {
    await page.goto("https://quefarmacia.com/medicamentos/" + med + "/");

    const info = await page.evaluate(() => {
      const featureArticle = document.evaluate(
        "//*[@id='bugiardinoBox']/p[1]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
      return featureArticle.textContent.split(".")[0];
    });

    const usos = await page.evaluate(() => {
      const featureArticle = document.evaluate(
        "//*[@id='bugiardinoBox']/ul[2]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
      return featureArticle.textContent;
    });

    const contradicciones = await page.evaluate(() => {
      const featureArticle = document.evaluate(
        "//*[@id='bugiardinoBox']/ul[4]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
      return featureArticle.textContent;
    });
    const ad = await page.evaluate(() => {
      const featureArticle = document.evaluate(
        "//*[@id='bugiardinoBox']/ul[5]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
      return featureArticle.textContent;
    });

    // console.log(ad);
    var arU = usos.split("\n");
    arU.shift();
    arU.pop();

    var arC = contradicciones.split("\n");
    arC.shift();
    arC.pop();

    var arAd = ad.split("\n");
    arAd.shift();
    arAd.pop();

    const ob = new Object();
    ob.info = info; //Array de Strings (info)
    ob.usos = arU;
    ob.contradicciones = arC;
    ob.ad = arAd;

    return ob;
  } catch (e) {
    console.log(e);
    return null;
  }
}

module.exports = {
  search,
  getInfo,
};
