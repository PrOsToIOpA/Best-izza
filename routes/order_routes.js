const { Router } = require('express');
const config = require('config');
const { check, validationResult } = require('express-validator');
const Order = require('../models/order');
const router = Router();

router.get(
   '/',

   async (req, res) => {
     try {
       const errors = validationResult(req);
 
       if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array(), message: 'Incorrect data' });
       }
 
       //const { name, newName } = req.body;

       const categories = await Order.find({});
 
       if (!categories) {
         return res.status(400).json({ message: 'No Category' });
       }
 
       res.status(201).json(categories);
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
       
       const { name, phone, adress, goods,totalCount, totalPrice, id } = req.body;
       
       
       
       const item = new Order({ name, phone, adress, goods,totalCount, totalPrice, id });
       await item.save();
       console.log('xxxx')
       res.status(201).json({ message: 'Item has been created' });
     } catch (e) {
       throw new Error(e)
       res.status(500).json({ message: 'Something get wron' });
     }
   },
 );
 module.exports = router