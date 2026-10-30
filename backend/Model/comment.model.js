const database = require('./../config/database.js');
const { DataTypes } = require('sequelize');

const Comment = database.define('Comment', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: { len: [1, 500] }
    }
}, {
    tableName: "comments"
});

module.exports = Comment;