const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    uid: String,
    group: String,
    subgroup: String,
    category: String,
    name: String,
    price: Number,
    promo_price: Number,
    imageUrl: String,
    is_active: {
        type: Boolean,
        default: true
      },
    is_promo: {
        type: Boolean,
        default: false
      }
})

module.exports = Product = mongoose.model("product", ProductSchema);