const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    coverImage: String,
    headImage: String,
    name: { type: String, required: true, max:[60, '最大60文字までです'] },
    description: String,
    productcopy1: String,
    description2: String,
    heading1: String,
    heading2: String,
    heading3: String,
    headingtext1: String,
    headingtext2: String,
    headingtext3: String,
    productImage: String,
    productImage2: String,
    productImage3: String
})

module.exports = mongoose.model('Product', ProductSchema)

