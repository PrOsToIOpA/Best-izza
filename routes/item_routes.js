const { Router } = require('express');
const config = require('config');
const { check, validationResult } = require('express-validator');
const Item = require('../models/item');
const router = Router();


router.get(
  '/',

  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: 'Incorrect data' });
      }
      var items = {}
      const { _sort, category, _order } = req.query;
      
      if(!category) {
        items = await Item.find({}).sort({"name":`${_order}`,"prices.price+0+26":`${_order}`});
      }
      else {
        items = await Item.find({category:category}).sort({"name":`${_order}`,"prices.price+0+26":`${_order}`});
      }

      
  /**"name":`${_order}`, */
        
        
      

       if (!items) {
        return res.status(400).json({ message: 'No Item' });
      }
      res.status(201).json(items);
    } catch (e) {
      res.status(500).json({ message: 'Something get wron' });
    }
  },
);


router.post(
  '/add',
  [
    check('name', 'Incorrect name').isLength({ min: 2 }),
    /**check('types', 'Incorrect name').isLength({ min: 2 }),
    check('sizes', 'Incorrect name').isLength({ min: 2 }),
    check('imageUrl', 'Incorrect name').isLength({ min: 2 }),
    check('prices', 'Incorrect name').isLength({ min: 2 }),
    check('category', 'Incorrect name').isLength({ min: 2 }),**/
  ],
  async (req, res) => {
    try {
      console.log('Add', req.body);
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: 'Incorrect data' });
      }
      
      const { name, newName,  imageUrl, types, sizes, prices, category } = req.body;
      
      
      
      const candidate = await Item.findOne({ newName });
     
      if (candidate) {
        return res.status(400).json({ message: 'Item has been already created' });
      }
      const item = new Item({ name:newName, imageUrl, types, sizes, prices, category });
      await item.save();
      console.log('xxxx')
      res.status(201).json({ message: 'Item has been created' });
    } catch (e) {
      throw new Error(e)
      res.status(500).json({ message: 'Something get wron' });
    }
  },
);

/**router.get(
   '/',

   async (req, res) => {
     try {
       const errors = validationResult(req);
 
       if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array(), message: 'Incorrect data' });
       }
 
       const { name } = req.body;
       console.log('r', req)

       const items = await Item.find({}).sort({"name":1});
       
 
        if (!items) {
         return res.status(400).json({ message: 'No Item' });
       }
       res.status(201).json(items);
     } catch (e) {
       res.status(500).json({ message: 'Something get wron' });
     }
   },
 );**/

router.post(
   '/delete',
   [
   ],
   async (req, res) => {
     try {
       const errors = validationResult(req);
 
       if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array(), message: 'Incorrect data' });
       }
 
       const { name } = req.body;
       const candidate = await Item.findOne({ name });
 
       if (!candidate) {
         return res.status(400).json({ message: 'No Item' });
       }
 
 
       await Item.findOneAndDelete({name})
       res.status(201).json({ message: 'Item has been deleted' });
     } catch (e) {
       res.status(500).json({ message: 'Something get wron' });
     }
   },
 );

router.post(
  '/update',
  [
   check('name', 'Incorrect name').isLength({ min: 2 }),
  ],
  async (req, res) => {
   try {
     const errors = validationResult(req);

     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array(), message: 'Incorrect data' });
     }

     const { name, newName,  imageUrl, types, sizes, prices, category } = req.body;
     console.log('name',name)
     const candidate = await Item.findOne({ name:newName, imageUrl, types, sizes, prices, category });




     await Item.findOneAndUpdate({name}, {$set:{name, imageUrl, types, sizes, prices, category}}, {new: true})
     res.status(201).json({ message: 'Item has been updated' });
   } catch (e) {
     res.status(500).json({ message: 'Something get wron' });
   }
  },
);

module.exports = router;