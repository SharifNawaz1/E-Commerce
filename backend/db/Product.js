const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: String,
    price:String,
    userId:String,
    category:String,
    company:String
})

module.exports = mongoose.model('products',ProductSchema)