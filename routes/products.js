const router = require('express').Router();
const { v4: uuid } = require('uuid')

const ProductModel = require('../models/Product')


router.get('/all/:outlet', async (req,res)=>{
  let outlet = req.params.outlet
  // console.log(outlet)
  // res.json({"outlet":outlet})
  if(!outlet) return;
  try{
    const allProducts = await ProductModel.find({outlet})
    res.json(allProducts)
  }
  catch(err){
    return res.json({
      errors: [
        {
          msg: "An error occurred, try again",
          err
        }
      ]
    });
  }
})

router.get('/single/:uid', async (req,res)=>{
  let uid = req.params.uid

  if(!uid) return;
  try{
    const product = await ProductModel.findOne({uid})
    res.json(product)
  }
  catch(err){
    return res.json({
      errors: [
        {
          msg: "An error occurred, try again",
          err
        }
      ]
    });
  }
})

router.get('/total/:outlet', async (req,res)=>{
  let outlet = req.params.outlet
  if(!outlet) return;
  try{
    const totalProducts = await ProductModel.find({outlet}).count();
    res.json(totalProducts)
  }
  catch(err){
    return res.json({
      errors: [
        {
          msg: "An error occurred, try again",
          err
        }
      ]
    });
  }
})

router.post('/group', async (req,res)=>{
  let {outlet, start, limit} = req.body;
  if(!outlet) return;
  try{
    const products = await ProductModel.find({outlet})
                                          .skip(start)
                                          .limit(limit)
                                          .sort({"uid":-1});

    res.json({products, start: parseInt(start) + parseInt(limit)})
  }
  catch(err){
    return res.json({
      errors: [
        {
          msg: "An error occurred, try again",
          err
        }
      ]
    });
  }
})

router.post('/sort', async (req,res)=>{
  let {outlet, start, limit, sortValue } = req.body;
  if(!outlet) return;
  let sortVal;
  switch(sortValue){
    case "price_low": sortVal = "price" ; break;
    case "price_high":  sortVal = "-price" ; break;
    case "name_asc":  sortVal = {"name": "asc"} ; break;
    case "name_desc":  sortVal = {"name": "desc"} ; break;
  }
  try{
    const products = await ProductModel.find({outlet})
                                          // .skip(start)
                                          // .limit(limit)
                                          .sort(sortVal);

    res.json(products)
  }
  catch(err){
    return res.json({
      errors: [
        {
          msg: "An error occurred, try again",
          err
        }
      ]
    });
  }
})

router.post('/search', async (req,res)=>{
  let {outlet, searchQuery} = req.body;
  if(!outlet) return;
  try{
    const products = await ProductModel.find({outlet, name: {$regex: searchQuery }}).sort({"uid":-1});
    res.json({products, query: searchQuery})
  }
  catch(err){
    return res.json({
      errors: [
        {
          msg: "An error occurred, try again",
          err
        }
      ]
    });
  }
})

router.post('/create',async(req,res)=>{
    try{
      const {group, subgroup, category, name, price, imageUrl, outlet, promo_price} = req.body
      const newProduct = new ProductModel({
        uid: uuid(),
        group: group.toLowerCase(),
        subgroup: subgroup.toLowerCase(),
        category: category.toLowerCase(),
        name: name.toLowerCase(),
        imageUrl,
        outlet,
        price
      })
      console.log(newProduct);
      const saveProduct = await newProduct.save();

      return res.json(saveProduct);
    }
    catch(err){
        return res.json({
            errors: [
              {
                msg: "An error occurred, try again",
                err
              }
            ]
          });
    }
})


module.exports = router;
