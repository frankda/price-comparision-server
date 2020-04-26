import request from 'superagent';
import { Request, Response, NextFunction } from "express";


request
  .get('https://www.chemistwarehouse.com.au')
  .then(res => {
    console.log(res.text)
  })
  .catch(err => {
    console.error(err)
  })