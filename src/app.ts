import express, {Request, Response} from 'express';
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import cors from 'cors';

import { initTestData, searchProduct } from './controllers/productController';

const app = express();

// Connect Mongodb atlas and check if connected
mongoose.connect(`mongodb+srv://frank:dqx910418@cluster0-fxva0.mongodb.net/test?retryWrites=true&w=majority`, { useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Express configuration
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors());
app.set("port", process.env.PORT || 3001);

/**
 * Primary app routes 
*/

app.get('/', initTestData)
app.get('/search/:productname',searchProduct);

export default app
