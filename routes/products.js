const express = require('express');
const Product = require('../models/Product')
const mongoose = require("mongoose");

var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name:`${process.env.CLOUDINARY_CLOUD_NAME}`,
    api_key:`${process.env.CLOUDINARY_API_KEY}`,
    api_secret:`${process.env.CLOUDINARY_API_SECRET}`
})

const router = express.Router();

//  @desc   getting initial 10 products
//  @route  GET /api/v1/products/
//  @access public
router.get('/',async(req, res)=>{
    let products = await Product.find().sort({createdAt: -1}).limit(3);
    res.status(200).json({success: true,data: products})
});

//  @desc   getting next 10 products
//  @route  GET /api/v1/products/nextproducts/:id
//  @access public
router.get('/nextproducts/:id',async(req, res)=>{
    let ob = new mongoose.Types.ObjectId(req.params.id);
    const products = await Product.find({ _id: { $lt: ob } }).sort({createdAt: -1}).limit(3);
    if(!products){
        return res.status(404).json({ success: false, data:{}});
    }
    res.status(200).json({success: true,data: products})
});

//  @desc   getting specific product with id
//  @route  GET /api/v1/products/:id
//  @access public
router.get('/:id',async(req, res)=>{
    let product = await Product.findOne({_id: req.params.id});
    if(!product){
        return res.status(404).json({ success: false, data:{}});
    }
    res.status(200).json({success: true,data: product})
});

//  @desc   Saving product
//  @route  POST /api/v1/products/
//  @access public
router.post('/',async(req, res)=>{
    let product = await Product.findOne({name: req.body.name});
    if(product){
        return res.status(401).json({ success: false, data:{},message:'Duplicate Name!'});
    }
    product = await Product.create(req.body);
    res.status(201).json({success: true,data: product});
});

//  @desc   updating specific product with id
//  @route  PUT /api/v1/products/:id
//  @access public
router.put('/:id',async(req, res)=>{
    let product = await Product.findOne({_id: req.params.id});
    if(!product){
        return res.status(404).json({ success: false, data:{}});
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        $new:true,
        runValidators:true
    })
    res.status(200).json({success: true,data: product})
});

//  @desc   delete specific product with id
//  @route  DELETE /api/v1/products/:id
//  @access public
router.delete('/:id',async(req, res)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(404).json({ success: false, data:{}});
    }
    await product.remove();
    res.status(200).json({success: true,data: {}})
});


//  @desc   Update specific product with id
//  @route  POST /api/v1/products/imageupload/
//  @access public
router.post('/imageupload',async(req, res)=>{
    const file = req.files.photo;
     cloudinary.uploader.upload(file.tempFilePath, (err, result)=>{
         if(err){
             return res.status(400).json({ success:false,data:{},err});
         }
         return res.status(200).json({ success: true,data:result});
     })
});

module.exports = router;