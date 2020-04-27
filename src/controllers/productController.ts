import mongoose from 'mongoose';
import { Product } from '../models/products';
import { Request, Response, NextFunction } from "express";
import { searchChemistProduct } from '../crawler/productCrawler';

// Init seed data for testing purpose
export const initTestData = (req: Request, res: Response, next: NextFunction) => {
  const seedData = new Product({price: 34, stock: true});
  seedData.save((err, product) => {
    if (err) res.send(err);
    res.json(product);
  })
  // next();  // delete this if there is no next function, or will cause ERR_HTTP_HEADERS_SENT
}

export const searchProduct = (req: Request, res: Response) => {
  const productname = req.body.productname;
  const html = searchChemistProduct(productname);
  console.log(html)
  res.json(html);
}