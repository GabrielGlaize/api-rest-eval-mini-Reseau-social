const User = require('./../model/user.model.js');

exports.create = async (req, res) => {
    const user = await User.create({
        email: req.body.email,
        password: req.body.password
    });
    res.status(201).json(user);
}

exports.getMe = async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.user.id
        }
    });
    res.status(200).json(user);
}

exports.getAll = async (req, res) => {
    const listUser = await User.findAll();
    res.status(200).json(listUser);
}

exports.getById = async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json(user);
}

exports.update = async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.params.id
        }
    });
    user.password = req.body.password;
    await user.save();
    res.status(201).json(user);
}

exports.delete = async (req, res) => {
    let result = await User.destroy({where: {
        id: req.params.id
    }});
    if(result !== 1){
        res.status(404).json("User not found");
    }
    res.status(204);
}