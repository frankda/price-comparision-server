import express from 'express';
import mongoose from "mongoose";
import { Product } from './models/products';
import bodyParser from 'body-parser';
import cors from 'cors';

import { initTestData } from './controllers/productController';

// global.Product = require('./models/products');

const app = express();
const port = process.env.PORT || 3000;

// Connect mongoDB Atlas
mongoose.connect(`mongodb+srv://frank:dqx910418@cluster0-fxva0.mongodb.net/test?retryWrites=true&w=majority`, { useUnifiedTopology: true, useNewUrlParser: true })

// Check if database has been connected
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Load middleware
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors());

/**
 * Primary app routes 
*/

app.get('/', initTestData)

app.listen(port, () => console.log('listening http://localhost:' + port))
