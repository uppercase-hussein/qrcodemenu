const router = require('express').Router();
const { v4: uuid } = require('uuid')

const ProductModel = require('../models/Product')


router.post('/create',async(req,res)=>{
    try{
      console.log("here")
      const {group, subgroup, category, name, price, promo_price} = req.body
      console.log(req.body);
      console.log(uuid());
      const newProduct = new ProductModel({
        uid: uuid(),
        group: group.toLowerCase(),
        subgroup: subgroup.toLowerCase(),
        category: category.toLowerCase(),
        name: name.toLowerCase(),
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
