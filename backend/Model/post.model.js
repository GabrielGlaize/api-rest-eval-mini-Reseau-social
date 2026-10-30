const { DataTypes } = require('sequelize');
const database = require('../config/database.js');

const Post = database.define('Post', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: { len: [1, 2000] }
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true // pour le bonus Multer
    }
}, {
    tableName: 'posts',
    timestamps: true
});

module.exports = Post;
