import mongoose from 'mongoose';
import { Product } from '../models/products';
import { Request, Response, NextFunction } from "express";
import { searchChemistProduct, getProductInfoFromPriceline, searchPricelineProduct } from '../crawler/productCrawler';
import cheerio from 'cheerio';
import urls from '../urls/urlLists';

// Init seed data for testing purpose
export const initTestData = (req: Request, res: Response, next: NextFunction) => {
  const seedData = new Product({price: 34, stock: true});
  seedData.save((err, product) => {
    if (err) res.send(err);
    res.json(product);
  })
  // next();  // delete this if there is no next function, or will cause ERR_HTTP_HEADERS_SENT
}

export const searchProduct = async (req: Request, res: Response, next: NextFunction) => {
  // Return products from different stores to front-end
  const chemistProducts = [];
  const pricelineProducts = [];

  const productname = req.body.productname;   // get the search value from front-end

  /*
  ** Get product list searched from chemistwarehouse
  */
  const result = await searchChemistProduct(productname);   // next() will be called with thrown error or the rejected value
  // const html = result.text  // if the result success
  let itemList = [];
  try {
    itemList = result.body.universes.universe[0]["items-section"].items.item;
    console.log(itemList);
  } catch {
    res.send('No matching were found'); 
    next();
  }
  
  // res.send(jsonhtml);

  // use cheerio to parse search results
  console.log('json obtained')
  // const $ = cheerio.load(html);
  // const searchedProductsFromChemist = $("a[class='search__result__product']");

  for (let i = 0; i < itemList.length; i++) {
    const product = {
      productName: '',
      productLink: '',
      productPrice: '',
      productImage: '',
    };
    // const productHtml = cheerio.html(searchedProduct)   // use cheerio.html() to get outer html content

    product.productName = itemList[i].attribute[2].value[0].value;
    product.productPrice = itemList[i].attribute[5].value[0].value;
    try {
      product.productLink = itemList[i].attribute[7].value[0].value;
    } catch {
      console.log('Product Link cannot find');
    }
    if (itemList[i].attribute[4].value[0].value.includes('http')) {
      product.productImage = itemList[i].attribute[4].value[0].value;
    } else {
      product.productImage = itemList[i].attribute[3].value[0].value;
    }
    

    chemistProducts.push(product);
    console.log(chemistProducts)
  }

  /*
  ** Get the first item from priceline
  */
  // console.log('Scraping priceline');
  // console.log(chemistProducts[0].productName);

  // const pricelineHtml = (await searchPricelineProduct(chemistProducts[0].productName)).text;
  // const p$ = cheerio.load(pricelineHtml);
  // const pricelineProduct = {
  //   productName: '',
  //   productLink: '',
  //   productPrice: '',
  //   productImage: '',
  // };
  // if (!pricelineHtml.includes('product-name')) res.send('No matching product in Priceline were found');

  // pricelineProduct.productImage = p$("div[class='item type-simple'] img").eq(0).attr('src')!;
  // pricelineProduct.productName = p$("div[class='item type-simple'] div[class='product-name brand-name'] span").eq(0).text() + $("div[class='item type-simple'] div[class='product-name brand-name'] span").eq(1).text();
  // pricelineProduct.productLink = p$("div[class='item type-simple'] a").eq(0).attr('href')!;
  // pricelineProduct.productPrice = p$("div[class='item type-simple'] div[class='price-box'] span[class=price]").eq(0).text();

  // console.log(pricelineProduct)

  res.send(chemistProducts);
}
