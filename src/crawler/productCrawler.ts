import request from 'superagent';
import { Request, Response, NextFunction } from "express";

/*
* These codes are for errors
*/
// export async function searchChemistProduct (next: NextFunction, productname: String) {
//   try {
//     const result = await request.get(`https://www.chemistwarehouse.com.au/search?searchtext=${productname}&searchmode=allwords`)
//     return result.text
//   } catch (err) {
//     console.log('Something is going wrong when searching chemist products, check /crawler/productCrawler.ts for information');
//     console.error(err.message);
//     return 'error';
//   }
// }

export async function searchChemistProduct (productname: String) {
  return await request.get(`https://www.chemistwarehouse.com.au/search?searchtext=${productname}&searchmode=allwords`)
}