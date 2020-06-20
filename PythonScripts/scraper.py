import requests
import mysql.connector
import lxml.html as html
import json
import sys
import time


def insertMeds(cursor, medicamento):
    insert_med = f"insert into medicamento (nombreMed) values ('{medicamento}')"
    cursor.execute(insert_med)


def insertProductos(cursor, medicamento, data):
    insert_product = f"INSERT INTO producto(nombreProd, precio, srcImgProd, srcUrlProd, tienda, idMed) VALUES (%(desc)s, %(precio)s, %(img)s, %(link)s, %(tienda)s, (select idMed from medicamento where nombreMed = '{medicamento}'))"
    for d in data:
        cursor.execute(insert_product, d)


def scrapeFarmaciaDelNino(medicamento):
    HOME_URL = "https://farmaciasdelnino.mx/esp/items/?kw="
    TIENDA = 'Farmacias del niño'
    XPATH_PRODUCT = '//div[@id="catalogo"]/div[@class="productos" or @class="productosultimo"]'
    XPATH_IMG = 'div[@class="foto"]/a/img/@data-src'
    XPATH_PRODUCT_NAME = 'div[@class="descripcion"]/h2/a/text()'
    XPATH_PRICE = 'div[@class="precio"]/span[@class="oferta"]/text()'
    XPATH_LINK = 'div[@class="descripcion"]/h2/a/@href'
    try:
        agent = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0'}
        response = requests.get(HOME_URL+medicamento, headers=agent)
        if response.status_code == 200:
            farmacia_del_nino = []
            products = response.content
            parsed = html.fromstring(products)
            nodes = parsed.xpath(XPATH_PRODUCT)
            product_names = []
            links = []
            imgs = []
            prices = []
            for node in nodes:
                img = node.xpath(XPATH_IMG)
                if len(img) < 1:
                    continue
                imgs += [str(img) for img in node.xpath(XPATH_IMG)]
                product_names += [str(product)
                                  for product in node.xpath(XPATH_PRODUCT_NAME)]
                prices += [str(price).replace("$", "").replace(" MXN", "")
                           for price in node.xpath(XPATH_PRICE)]
                links += [str(link) for link in node.xpath(XPATH_LINK)]

            for i in range(len(product_names)):
                farmacia_del_nino.append({
                    "desc": product_names[i],
                    "precio": prices[i],
                    "img": imgs[i],
                    "link": links[i],
                    "tienda": TIENDA
                })
            return farmacia_del_nino
        else:
            raise ValueError("No se encontró el medicamento")
    except ValueError as ve:
        print(ve)


# def scrapeSuperama(medicamento):
#     HOME_URL = "https://www.superama.com.mx/buscar/d-farmacia/"
#     HEADER_LINK = "https://www.superama.com.mx"
#     TIENDA = "Superama"
#     XPATH_PRODUCT = '//ul[@id="resultadoProductosBusqueda"]/li[@class="upcWrapper item isotope-item"]/div[@class="itemGrid"]'
#     XPATH_IMG = '//ul[@id="resultadoProductosBusqueda"]/li[@class="upcWrapper item isotope-item"]/div[@class="itemGrid"]/div[@class="upcImage"]/a/img/@src'
#     XPATH_LINK = 'div[@class="upcImage"]/a/@href'
#     XPATH_PRODUCT_NAME = 'div[@class="upcName"]/p/@title'
#     XPATH_PRICE = 'p[@class="upcPrice"]/text()'
#     try:
#         agent = {
#             'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0'}
#         response = requests.get(HOME_URL+medicamento,
#                                 time.sleep(6), headers=agent,)
#         if response.status_code == 200:
#             superama = []
#             products = response.content.decode("utf-8")
#             print(HOME_URL+medicamento)
#             print(products)
#             with open("superama.html", "w") as file:
#                 file.write(products)

#             parsed = html.fromstring(products)
#             print(parsed.xpath('/'))
#             nodes = parsed.xpath(XPATH_PRODUCT)
#             nodes = parsed.xpath(XPATH_PRODUCT)
#             product_names = []
#             links = []
#             imgs = []
#             prices = []
#             print(parsed.xpath(XPATH_IMG))
#             imgs += [str(img) for img in parsed.xpath(XPATH_IMG)]
#             for node in nodes:
#                 imgs += [str(img) for img in node.xpath(XPATH_IMG)]
#                 product_names += [str(product)
#                                   for product in node.xpath(XPATH_PRODUCT_NAME)]
#                 for price in node.xpath(XPATH_PRICE):
#                     if str(price) == "":
#                         continue
#                     prices += str(price).replace("$", "").strip()

#                 links += [HEADER_LINK+str(link)
#                           for link in node.xpath(XPATH_LINK)]
#             print(product_names)
#             print(links)
#             print(imgs)
#             print(prices)

#         else:
#             raise ValueError("No se encontró el medicamento")
#     except ValueError as ve:
#         print(ve)


def scrapeFarmaciaSanPablo(medicamento):
    HOME_URL = "https://www.farmaciasanpablo.com.mx/search?q="
    TIENDA = "Farmacia San Pablo"
    HEADER_LINK = 'https://www.farmaciasanpablo.com.mx'
    XPATH_IMG = '//ul[@class="row items product-listing product-list"]/div/div/div/div/a/img/@data-src'
    XPATH_LINK = '//ul[@class="row items product-listing product-list"]/div/div/div/div/a[@class]/@href'
    XPATH_PRODUCT_NAME = '//ul[@class = "row items product-listing product-list"]/div/div/@data-product-name'
    XPATH_PRICE = '//ul[@class="row items product-listing product-list"]/div/div/@data-product-base-price'
    try:
        agent = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0'}
        response = requests.get(HOME_URL+medicamento, headers=agent)
        if response.status_code == 200:
            farmacia_san_pablo = []
            products = response.content.decode("utf-8")
            parsed = html.fromstring(products)
            product_names = []
            links = []
            imgs = []
            prices = []
            imgs += [str(img) for img in parsed.xpath(XPATH_IMG)]
            links += [HEADER_LINK+str(link)
                      for link in parsed.xpath(XPATH_LINK)]
            prices += [str(price) for price in parsed.xpath(XPATH_PRICE)]
            product_names += [str(name)
                              for name in parsed.xpath(XPATH_PRODUCT_NAME)]
            for i in range(len(product_names)):
                farmacia_san_pablo.append({
                    "desc": product_names[i],
                    "precio": prices[i],
                    "img": imgs[i],
                    "link": links[i],
                    "tienda": TIENDA
                })
            return farmacia_san_pablo
        else:
            raise ValueError("No se encontró el medicamento")
    except ValueError as ve:
        print(ve)


def scrapeChedraui(medicamento):
    HOME_URL = f"https://www.chedraui.com.mx/search?q={medicamento}%3Arelevance%3Acategory_l_1%3AMC24%3Acategory_l_2%3AMC2401&text={medicamento}&toggleView=grid"
    TIENDA = "Chedraui"
    HEADER_LINK = 'https://www.chedraui.com.mx'
    XPATH_PRODUCT = '//ul[@id="plp_display"]/li[@class="product__list--item js-plp-product-click"]'

    try:
        agent = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0'}
        response = requests.get(HOME_URL, headers=agent)
        if response.status_code == 200:
            chedraui = []
            products = response.content.decode("utf-8")
            parsed = html.fromstring(products)
            nodes = parsed.xpath(XPATH_PRODUCT)
            product_names = []
            links = []
            imgs = []
            prices = []

            for i in range(len(nodes)):
                product_names += [str(name) for name in nodes[i].xpath(
                    f'input[@class="productClickData_plp_name_{i}"]/@value')]
                prices += [str(price) for price in nodes[i].xpath(
                    f'input[@class="productClickData_plp_price_{i}"]/@value')]
                links += [HEADER_LINK+str(link) for link in nodes[i].xpath(
                    f'a[@class="product__list--thumb"]/@href')]
                imgs += [HEADER_LINK+str(img) for img in nodes[i].xpath(
                    f'a[@class="product__list--thumb"]/div[@class="plp-product-thumb"]/img/@src')]

            for i in range(len(product_names)):
                chedraui.append({
                    "desc": product_names[i],
                    "precio": prices[i],
                    "img": imgs[i],
                    "link": links[i],
                    "tienda": TIENDA
                })
            return chedraui
        else:
            raise ValueError("No se encontró el medicamento")
    except ValueError as ve:
        print(ve)


def scrapeFarmaciaGuadalajara(medicamento):
    HOME_URL = f'https://www.farmaciasguadalajara.com/SearchDisplay?categoryId=&storeId=10151&catalogId=10052&langId=-24&sType=SimpleSearch&resultCatEntryType=2&showResultsPage=true&searchSource=Q&pageView=&beginIndex=0&pageSize=20&searchTerm={medicamento}'
    TIENDA = 'Farmacias Guadalajara'

    try:
        agent = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0'}
        response = requests.get(HOME_URL, headers=agent)
        if response.status_code == 200:
            farmacia_guadalajara = []
            products = response.content.decode("utf-8")
            parsed = html.fromstring(products)
            product_names = []
            links = []
            imgs = []
            prices = []

            links += [str(link) for link in parsed.xpath(
                '//ul[@class="grid_mode grid"]/li/div[@class="product"]/div[@class="product_image pl_product_img"]/div/div/a/@href')]

            imgs += [str(img) for img in parsed.xpath(
                '//ul[@class="grid_mode grid"]/li/div[@class="product"]/div[@class="product_image pl_product_img"]/div/div/a/img/@src')]

            product_names += [str(name).strip() for name in parsed.xpath(
                '//ul[@class="grid_mode grid"]/li/div[@class="product"]/div[@class="product_info"]/div[@class="product_name"]/a/text()')]

            prices += [str(price).strip().replace("$", "") for price in parsed.xpath(
                '//ul[@class="grid_mode grid"]/li/div[@class="product"]/div[@class="product_info"]/div[@class="product_price"]/span[@class="price"]/text()')]

            for i in range(len(product_names)):
                farmacia_guadalajara.append({
                    "desc": product_names[i],
                    "precio": prices[i],
                    "img": imgs[i],
                    "link": links[i],
                    "tienda": TIENDA
                })
            return farmacia_guadalajara
        else:
            raise ValueError("No se encontró el medicamento")
    except ValueError as ve:
        print(ve)


def run(medicamento, cursor):
    data = []
    data_farmacia_del_nino = scrapeFarmaciaDelNino(medicamento)
    data_farmacia_san_pablo = scrapeFarmaciaSanPablo(medicamento)
    data_chedraui = scrapeChedraui(medicamento)
    data_farmacia_guadalajara = scrapeFarmaciaGuadalajara(medicamento)
    data = data_farmacia_del_nino + data_farmacia_san_pablo + \
        data_chedraui + data_farmacia_guadalajara
    insertMeds(cursor, medicamento)
    insertProductos(cursor, medicamento, data)
    with open(f"meds\\{medicamento}.json", "w") as file:
        file.writelines(json.dumps(data, indent=4))


if __name__ == "__main__":
    cnx = mysql.connector.connect(
        host="localhost",
        user="root",
        password="root",
        database="medic"
    )
    cursor = cnx.cursor()
    run(sys.argv[1], cursor)
    cnx.commit()
    cnx.close()
