const database = require('../config/database.js');
const { DataTypes } = require('sequelize');


const User = database.define('User', {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            tableName: 'users',
        });

function findAll() {
    return User.findAll();
}

function findByPk(id) {
    return User.findByPk(id);
}

async function create(userData) {
    const user = await User.create(userData);
    return user;
}

async function update(id, userData) {
    const user = await User.findByPk(id);
    if (user) {
        await user.update(userData);
        return user;
    }
    return null;
}
module.exports = User;