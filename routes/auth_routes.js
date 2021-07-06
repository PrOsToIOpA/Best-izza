const { Router, response } = require('express');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/user');
const router = Router();

router.post(
  '/register',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Incorrect password').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: 'Incorrect data' });
      }

      const { email, password, name, lastName, phone, adress } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: 'User has been already created' });
      }

      const hashpassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashpassword, name, lastName, phone, adress});

      await user.save();
      res.status(201).json({ message: 'User has been created' });
    } catch (e) {
      res.status(500).json({ message: 'Something get wron' });
    }
  },
);

router.post(
  '/update',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Incorrect password').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: 'Incorrect data' });
      }

      const { email, password, name, lastName, phone, adress } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: 'User has been already created' });
      }

      const hashpassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashpassword, name, lastName, phone, adress});

      await user.save();
      res.status(201).json({ message: 'User has been created' });
    } catch (e) {
      res.status(500).json({ message: 'Something get wron' });
    }
  },
);

router.post(
  '/login',
  [
    check('email', 'Input coorect email').normalizeEmail().isEmail(),
    check('password', 'Input coorect password').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array(), message: 'Incorrect data for sign in' });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'User hasn`t been found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect password or email' });
      }
      const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), { expiresIn: '1h' });

      

      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: 'Something get wron' });
    }
  },
);

module.exports = router;
