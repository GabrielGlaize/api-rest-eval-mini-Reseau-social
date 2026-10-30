const { DataTypes } = require('sequelize');
const database = require('../config/database.js');

const Comment = database.define('Comment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    postId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING(500),
        allowNull: false,
        validate: { len: [1, 500] }
    }
}, {
    tableName: 'comments',
    timestamps: true
});

module.exports = Comment;
