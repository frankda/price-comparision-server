import express from 'express';
import mongoose from "mongoose";
import Product from './models/products';


// global.Product = require('./models/products');

const app = express()
const port = 3000

// mongodb+srv://frank:<password>@cluster0-fxva0.mongodb.net/test?retryWrites=true&w=majority

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => console.log('listening http://localhost:' + port))
