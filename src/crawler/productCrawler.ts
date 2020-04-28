import request from 'superagent';
import { Request, Response, NextFunction } from "express";

export async function searchChemistProduct (productname: String) {
  const result = await request.get(`https://www.chemistwarehouse.com.au/search?searchtext=${productname}&searchmode=allwords`)
  return result.text
}