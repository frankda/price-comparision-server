import mongoose from 'mongoose';
import { Product } from '../models/products';
import { Request, Response, NextFunction } from "express";
import { searchChemistProduct } from '../crawler/productCrawler';
import cheerio from 'cheerio';

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
  const result = await searchChemistProduct(productname);   // next() will be called with thrown error or the rejected value
  const html = result.text  // if the result success 
  if (!html.includes('product-name')) res.send('No matching were found');   // if cannot find matching products

  // use cheerio to parse search results
  console.log('html page obtained')
  const $ = cheerio.load(html);
  const searchedProductsFromChemist = $("a[class='product-container search-result']");
  console.log(searchedProductsFromChemist.eq(0).html());

  
  res.send($("div[class=product-name]").eq(0).text());
}