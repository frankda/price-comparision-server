import mongoose from "mongoose";

const {Schema} = mongoose;

const ProductSchema = new Schema({
  price: {
    type: Number
  },
  stock: {
    type: Boolean
  }
})

const Product = mongoose.model('')

export default Product