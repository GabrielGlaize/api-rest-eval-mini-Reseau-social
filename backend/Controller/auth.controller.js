const bcrypt = require('bcryptjs');
const User = require('../Model/user.model.js');
const jwt = require('jsonwebtoken');
const passwordComplexity = require("joi-password-complexity");
require('dotenv').config();

exports.login = async (req, res) => {
    let user = await User.scope('withPassword').findOne({
        where : {
            email: req.body.email
        }
    });
    if(!user){
        return res.status(400).json("Login or password incorrect");
    }
    const valid = await bcrypt.compare(req.body.password, user.password);
    if(!valid){
        return res.status(400).json("Login or password incorrect");
    }
    const token = jwt.sign({
        id: user.id,
    }, process.env.JWT_KEY);
    return res.status(200).json(token);
}

exports.signin = async (req, res) => {
    let user = await User.findOne({
        where : {
            email: req.body.email
        }
    });
    if(user){
        return res.status(400).json("User already exists");
    }
    if(!passwordComplexity().validate(req.body.password).error){
        return res.status(400).json("Password is not complex enough");
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
        email: req.body.email,
        password: hash
    });
    res.status(201).json(newUser);
}