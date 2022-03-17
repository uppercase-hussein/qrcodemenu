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
                                          .limit(limit);

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

router.post('/create',async(req,res)=>{
    try{
      const {group, subgroup, category, name, price, promo_price} = req.body
      console.log(req.body);
      console.log(uuid());
      const newProduct = new ProductModel({
        uid: uuid(),
        group: group.toLowerCase(),
        subgroup: subgroup.toLowerCase(),
        category: category.toLowerCase(),
        name: name.toLowerCase(),
        imageUrl,
        outlet,
        price,
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
