import request from 'superagent';
import { Request, Response, NextFunction } from "express";


request
  .get('https://shop.coles.com.au/a/national/home')
  .then(res => {
    console.log(res.text)
  })
  .catch(err => {
    console.error(err)
  })