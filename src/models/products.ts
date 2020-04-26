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

export const Product = mongoose.model('Product', ProductSchema);
// import { Product } from '/models/products.ts'

// Other way to export:
// 1.
// export default mongoose.model('Product', ProductSchema)
// import Product from '/models/products.ts'

// 2.
// module.export = mongoose.model('Product', ProductSchema);
// import Product = require('/models/products.ts')

