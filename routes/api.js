const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const prodModel = require('../model/product');
const route = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{       
        cb(null, 'uploads');
    },
    filename: (req, file, cb)=>{
        const imgName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, imgName);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10 }
});

// all products
route.get("/products", async(req, res)=>{
    await prodModel.find({}, (err, docs)=>{
        if(!err){
            res.json(docs);
        } else { res.json({err: err}); }
    });    
});

// add new product
route.post("/products", upload.single('prodImg'), (req, res)=>{    
    const picPath = `${process.env.APP_URL}/${req.file.filename}`;
    const prodObj = {...req.body, imgName: req.file.filename, imgPath: picPath};

    const newProd = new prodModel({
        name: req.body.name,
        price: req.body.price,
        info: req.body.info,
        imgName: req.file.filename,
        imgPath: picPath
    });

    newProd.save(err=>{
        !err ? res.json(prodObj) : res.json({err: err});
    });
});

//get single product
route.get("/single-product/:prodId", async(req, res)=>{
    const prodId = req.params.prodId;
    await prodModel.findById(prodId, (err, doc)=>{
        if(!err){
            res.json(doc);
        } else { res.json({err: err}); }
    });    
});

// delete product
route.delete("/delete-products/:prodId", async(req, res)=>{
    const prodId = req.params.prodId;
    const product = await prodModel.findById(prodId);
    const directory = `./uploads/${product.imgName}`;

    fs.unlink(directory, async(err) => {
        if(!err){
            await prodModel.findByIdAndDelete(prodId, (err, doc)=>{
                if(!err){                    
                    res.json({msg: "File has been deleted!"});
                } else { res.json({err: err}); }                   
            });            
        } else { res.json({err: err}); }
    });
});


module.exports = route;