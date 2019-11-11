const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        unique:true,
        trim: true,
        maxlength:[50,'Name can not be more than 50 charecters']
    },
    image: {
        type: String,
        default:'https://i.ibb.co/2qd7fY2/download.png'
    },
    description: String,
    rating:Number,
    price:Number,
    seller:String,
    manufacturer:String,
    discount:Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Product', ProductSchema);
