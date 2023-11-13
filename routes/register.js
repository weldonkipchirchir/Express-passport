const express = require('express')
const bcrypt = require('bcryptjs');
const router = express.Router()
const {User} = require('../models/user')

const validateInput = require('../middleware/validateInput')

router.post('/', validateInput, async(req, res)=>{
    try{
      const {
        username,
        password
    } = req.body

    //check if username already exists
    const existingUser = await User.findOne({
        username
    });
    if (existingUser) {
        return res.status(400).json({
            message: 'Username already exits'
        });
    } else {
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        //create a new user
        const newUser = new User({
            username,
            password: hashedPassword
        });
        await newUser.save();
      res.status(201).json({ message: 'User registered successfully', newUser });
    }
  }catch(err){
        console.error(err);
        res.send(err.message)
        // res.status(500).json({ message: 'Server error' });
  }
})
module.exports= router;