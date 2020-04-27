import request from 'superagent';
import { Request, Response, NextFunction } from "express";

export function searchChemistProduct (productname: String) {
  request   // use await to make sure to get page source first and return to html
    .get(`https://www.chemistwarehouse.com.au/search?searchtext=${productname}&searchmode=allwords`)
    .then(result => {
      console.log('Getting chemist searched page');
      function fetchResult() {
        console.log('closure working')
        return result.text
      }
      fetchResult()
    })
    .catch(err => {
      console.error(err)
    });
}