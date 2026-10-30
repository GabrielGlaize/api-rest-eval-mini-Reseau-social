const { DataTypes } = require('sequelize');
const database = require('../config/database.js');

const User = database.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true // la collation MySQL par défaut est insensible à la casse : Alice = alice
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false // empreinte bcrypt/scrypt, jamais le mot de passe en clair
    }
}, {
    tableName: 'users',
    timestamps: true,
    defaultScope: {
        attributes: { exclude: ['password'] } // le hash ne sort jamais par défaut
    },
    scopes: {
        withPassword: { attributes: {} } // User.scope('withPassword') pour le login
    }
});

module.exports = User;
