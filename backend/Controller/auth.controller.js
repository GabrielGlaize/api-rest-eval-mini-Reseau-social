const bcrypt = require('bcryptjs');
const User = require('../Model/user.model.js');
const jwt = require('jsonwebtoken');
const passwordComplexity = require("joi-password-complexity");
require('dotenv').config();

function getCredentials(req) {
    const body = req.body;
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
        return null;
    }

    const { username, password } = body;
    if (typeof username !== 'string' || !username.trim() ||
        typeof password !== 'string' || !password) {
        return null;
    }

    return { username: username.trim(), password };
}

exports.login = async (req, res) => {
    const credentials = getCredentials(req);
    if (!credentials) {
        return res.status(400).json({ error: 'Nom dutilisateur et mot de passe requis' });
    }

    let user = await User.findOne({
        where : {
            username: credentials.username
        }
    });
    if(!user){
        return res.status(401).json({ error: "Login or password incorrect" });
    }
    const valid = await bcrypt.compare(credentials.password, user.password);
    if(!valid){
        return res.status(401).json({ error: "Login or password incorrect" });
    }
    const token = jwt.sign({
        id: user.id,
    }, process.env.JWT_KEY);
    return res.status(200).json({ token, user: { id: user.id, username: user.username } });
}

exports.logout = async (req, res) => {
    const token = req.token;
    if (!token) {
        return res.status(400).json({ error: 'Token manquant' });
    }
    revokedTokens.add(token);
    return res.status(200).json({ message: 'Déconnexion réussie' });
}

exports.getMe = async (req, res) => {
    const user = await User.findByPk(req.payload.id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ id: user.id, username: user.username });
}

exports.register = async (req, res) => {
    const credentials = getCredentials(req);
    if (!credentials) {
        return res.status(400).json({ error: 'Nom dutilisateur et mot de passe requis' });
    }

    let user = await User.findOne({
        where : {
            username: credentials.username
        }
    });
    if(user){
        return res.status(409).json({ error: "User already exists" });
    }
    if(passwordComplexity().validate(credentials.password).error){
        return res.status(400).json({ error: "Password is not complex enough" });
    }
    const hash = await bcrypt.hash(credentials.password, 10);
    const newUser = await User.create({
        username: credentials.username,
        password: hash
    });
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_KEY);
    res.status(201).json({ token, user: { id: newUser.id, username: newUser.username } });
}