const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async (req,res) => {

    res.status(400);
    const {username, email, password} = req.body;
    if(!username || !email || !password) throw new Error('Every field is required');

    const emailRegistered = await User.findOne({email});
    if(emailRegistered) throw new Error('Email is not available');
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword
    });

    if(newUser) {
        res.status(201).json({
            _id: newUser._id,
            email: newUser.email
        })
    }
})

const loginUser = asyncHandler(async (req,res) => {

    res.status(400);
    const {email, password} = req.body;
    if(!email || !password) throw new Error('Every field is required');

    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({username: user.username, email: user.email, id:user._id}, process.env.JWT_SECRET);
        res.status(200).json({
            accessToken: accessToken
        })
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }

})

const currentUser = asyncHandler(async (req,res) => {
    res.status(200).json(req.user);
})

module.exports = {
    registerUser,
    loginUser,
    currentUser
}