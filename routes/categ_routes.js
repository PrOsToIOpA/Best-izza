const { Router, response } = require('express');
const config = require('config');

const { check, validationResult } = require('express-validator');
const Category = require('../models/categoryM');
const router = Router();

router.post(
  '/add',
  [
    check('name', 'Incorrect name').isLength({ min: 2 }),
  ],
  async (req, res) => {
    try {
      
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: 'Incorrect data' });
      }

      const { name, newName } = req.body;

      const candidate = await Category.findOne({ newName });

      if (candidate) {
        return res.status(400).json({ message: 'Category has been already created' });
      }
      const category = new Category({ name:newName} );
      await category.save();
      res.status(201).json({ message: 'Category has been created' });
    } catch (e) {
      //throw new Error(e)
      res.status(500).json({ message: 'Something get wron' });
    }
  },
);

router.get(
   '/',

   async (req, res) => {
     try {
       const errors = validationResult(req);
 
       if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array(), message: 'Incorrect data' });
       }
 
       //const { name, newName } = req.body;

       const categories = await Category.find({});
       console.log(
         "1",categories
       );
 
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
   '/delete',
   [
   ],
   async (req, res) => {
     try {
       console.log('gfd', req.body);
       const errors = validationResult(req);
 
       if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array(), message: 'Incorrect data' });
       }
 
       const { name, newName } = req.body;
 
       const candidate = await Category.findOne({ name:newName });
 
       if (!candidate) {
         return res.status(400).json({ message: 'No Category' });
       }
 
 
       await Category.findOneAndDelete({name:newName})
       res.status(201).json({ message: 'Category has been deleted' });
     } catch (e) {
       res.status(500).json({ message: 'Something get wron' });
     }
   },
 );

router.post(
  '/update',
  [
   check('name', 'Incorrect name').isLength({ min: 2 }),
   check('newName', 'Incorrect name').isLength({ min: 2 }),
  ],
  async (req, res) => {
   try {
     console.log('gfd', req.body);
     const errors = validationResult(req);

     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array(), message: 'Incorrect data' });
     }

     const { name, newName } = req.body;
     console.log('name',name)
     const candidate = await Category.findOne({ name });

     if (!candidate) {
       return res.status(400).json({ message: 'No Category' });
     }


     await Category.findOneAndUpdate({name}, {$set:{name: newName}}, {new: true})
     res.status(201).json({ message: 'Category has been updated' });
   } catch (e) {
     res.status(500).json({ message: 'Something get wron' });
   }
  },
);

module.exports = router;