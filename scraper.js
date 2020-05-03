var puppeteer = require("puppeteer");

async function searchChe(med, page) {
  // await page.goto("https://www.chedraui.com.mx/search?text=" + med);

  await page.goto(
    `https://www.chedraui.com.mx/search?sort=relevance&pageSize=48&q=${med}%3Arelevance%3Acategory_l_1%3AMC24&toggleView=grid#`
  );

  const titles = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a.name")).map((partner) =>
      partner.innerText.trim()
    )
  );

  const prices = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll("div.product__list--price-panel")
    ).map((partner) => partner.innerText.trim())
  );

  const imgs = await page.evaluate(() =>
    Array.from(document.querySelectorAll("div.plp-product-thumb > img")).map(
      (img) => img.src
    )
  );

  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a.name")).map(
      (partner) => partner.href
    )
  );

  const arr = [];
  const data = [];

  arr.push(titles, prices, imgs, links);

  return arr;
}

async function searchAmz(med, page) {
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
  const arr = [];
  arr.push(titles, prices, imgs, links);
  return arr;
}

async function searchFaho(med, page) {
  await page.goto("https://www.fahorro.com/catalogsearch/result/?q=" + med);

  const titles = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".product-shop > h2")).map((partner) =>
      partner.innerText.trim()
    )
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

  const arr = [];
  arr.push(titles, prices, imgs, links);
  return arr;
}

async function searchAll(m) {
  const browser = await puppeteer.launch({ headless: true });
  const p = await browser.newPage();
  await p.setViewport({ height: 1200, width: 960 });
  const prod = [];
  const pF = await searchFaho(m, p);
  const pA = await searchAmz(m, p);
  const pC = await searchChe(m, p);
  const titles = pF[0].concat(pA[0], pC[0]);
  const prices = pF[1].concat(pA[1], pC[1]);
  const imgs = pF[2].concat(pA[2], pC[2]);
  const links = pF[3].concat(pA[3], pC[3]);
  prod.push(titles, prices, imgs, links);
  console.log(prod.length);
  return prod;
  // return pC;
}

async function search(m) {
  const data = await searchAll(m);
  // console.log(data);
  return data;
}

module.exports = {
  search,
};

// search("xl3");
