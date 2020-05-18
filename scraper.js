var puppeteer = require("puppeteer");

async function searchChe(med, page) {
  try{
  await page.goto(
    `https://www.chedraui.com.mx/search?q=${med}%3Arelevance%3Acategory_l_1%3AMC24&text=xl3&toggleView=grid`
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
    Array.from(document.querySelectorAll("div.plp-product-thumb > img:not([class='PLP-promotion-icon'])")).map(
      (img) => img.src
    )
  );
  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a.name")).map(
      (partner) => partner.href
    )
  );
  let arr = [];
  arr.push(titles, prices, imgs, links);

  return arr;}
  catch(e){
    console.log(e);
    return null;
  }
}

async function searchAmz(med, page) {
  try{
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
  arr.push(titles, prices, imgs, links);

  return arr;
  }catch(e){
    console.log(e);
    return null;
  }
}
async function searchFaho(med, page) {
  try{
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
  let arr = [];
  arr.push(titles, prices, imgs, links);

  return arr;
}
  catch(e){
    console.log(e);
    return null;
  }
}

async function search(m,p) {
  
  let prod = [];

  const pF = await searchFaho(m, p);
  const pA = await searchAmz(m, p);
  const pC = await searchChe(m, p);
  
  const titles = pF[0].concat(pA[0], pC[0]);
  const prices = pF[1].concat(pA[1], pC[1]);
  const imgs = pF[2].concat(pA[2], pC[2]);
  const links = pF[3].concat(pA[3], pC[3]);

  for (var i = 0; i < titles.length; i++) {
    const ob = new Object();
    ob.desc = titles[i];
    ob.precio = prices[i];
    ob.img = imgs[i];
    ob.link = links[i];
    prod.push(ob);
  }

  return prod;
}

module.exports = {
  search,
  //////////////////////////////
  getInfo,
  ///////////////////////
};



async function getInfo(med, page) {
  try{
    await page.goto(
      "https://quefarmacia.com/medicamentos/"+med+"/"
    );
    
    const desc = document.querySelector("div.bugiardinoBox > p").innerText.trim();
    if(desc.includes('.')){
      desc = desc.substr(0, desc.indexOf('.')+1);
    }

    const info = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".col-md-8 > p")).map(
      (img) => img.src
    )
  );
  const info2 = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".col-md-4 > p")).map(
      (img) => img.src
    )
  );
  var i = info.concat(info2);

  const ob = new Object();
  ob.desc = desc; //String que contiene Descripción del medicamento
  ob.info = i; //Array de Strings (info)

  return ob;
  }catch(e){
      console.log(e);
      return null;
    }
  }
  