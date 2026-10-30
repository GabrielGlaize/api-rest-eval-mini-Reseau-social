const express = require('express');
const router = express.Router();
const userController = require('./../controller/user.controller.js');

router.get('/', userController.getAll);

router.get('/:id', userController.getById);

router.get('/me', userController.getMe);

router.get('/filter/:name/:limit', (req, res, next) => {
    res.status(200).json("Filtre des utilisateur, name:" + req.params.name + " limit:" + req.params.limit);
});

router.post('/', userController.create);

router.put('/:id', userController.update);

router.delete('/:id', userController.delete);

module.exports = router;

