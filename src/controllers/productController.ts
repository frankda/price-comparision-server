import mongoose from 'mongoose';
import { Product } from '../models/products';
import { Request, Response, NextFunction } from "express";

// Init seed data for testing purpose
export const initTestData = (req: Request, res: Response, next: NextFunction) => {
  const seedData = new Product({price: 34, stock: true});
  seedData.save((err, product) => {
    if (err) res.send(err);
    res.json(product);
  })
  next();
}
