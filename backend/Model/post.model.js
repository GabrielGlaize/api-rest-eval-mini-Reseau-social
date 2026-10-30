const database = require('./../config/database.js');
const { DataTypes } = require('sequelize');

const Post = database.define('Post', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: { len: [1, 2000] }
    }
}, {
    tableName: "posts"
});

module.exports = Post;
