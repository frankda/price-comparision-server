import request from 'superagent';
import { Request, Response, NextFunction } from "express";
import urls from '../urls/urlLists';
import cheerio from 'cheerio';


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

export async function searchChemistProduct (productname: string) {
  return await request.get(`https://www.chemistwarehouse.com.au/searchapi/webapi/search/terms?category=catalog01_chemau&term=${productname}&index=0&sort=`);
}

// export async function searchPricelineProduct (productname: string) {
//   let result = {text: ''};
//   try {
//    result = await request.get(`${ urls.priceline }/search/?q=${ productname }`);
//   } catch (err) {
//    result = {text: ''};
//   }
//   return result
// }

export async function searchPricelineProduct (productname: string) {
  console.log(productname.trim().replace(' ', '%20'));
  productname = productname.trim().replace(' ', '%20');
  console.log(`${ urls.priceline }/search/?q=${ productname }`)
  return await request.get(`https://www.priceline.com.au/search/?q=test`);
}

export async function getProductInfoFromPriceline (req: Request, res: Response, productname: string) {
  const html = (await searchPricelineProduct(productname)).text;
  const $ = cheerio.load(html);
  const product = {
    productName: '',
    productLink: '',
    productPrice: '',
    productImage: '',
  };
  if (!html.includes('product-name')) res.send('No matching product in Priceline were found');

  product.productImage = $("div[class='item type-simple'] img").eq(0).attr('src')!;
  product.productName = $("div[class='item type-simple'] div[class='product-name brand-name'] span").eq(0).text() + $("div[class='item type-simple'] div[class='product-name brand-name'] span").eq(1).text();
  product.productLink = $("div[class='item type-simple'] a").eq(0).attr('href')!;
  product.productPrice = $("div[class='item type-simple'] div[class='price-box'] span[class=price]").eq(0).text();
  
  return product;
}

// async function test (productname: string) {
//   const html = (await searchPricelineProduct(productname)).text;
//   const $ = cheerio.load(html);
//   const product = {
//     productName: '',
//     productLink: '',
//     productPrice: '',
//     productImage: '',
//   };

//   product.productImage = $("div[class='item type-simple'] img").eq(0).attr('src')!;
//   product.productName = $("div[class='item type-simple'] div[class='product-name brand-name'] span").eq(0).text() + $("div[class='item type-simple'] div[class='product-name brand-name'] span").eq(1).text();
//   product.productLink = $("div[class='item type-simple'] a").eq(0).attr('href')!;
//   product.productPrice = $("div[class='item type-simple'] div[class='price-box'] span[class=price]").eq(0).text();
  
//   return product;
// }

// const testproduct = await test('test').catch(()=>{'bad luck'});
// console.log(testproduct)