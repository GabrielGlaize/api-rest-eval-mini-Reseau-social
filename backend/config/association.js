const User = require('../Model/user.model.js');
const Post = require('../Model/post.model.js');
const Comment = require('../Model/comment.model.js');

exports.associate = async () => {
    User.hasMany(Post, { foreignKey: 'userId' });
    Post.belongsTo(User, { foreignKey: 'userId', as: 'author' });

    User.hasMany(Comment, { foreignKey: 'userId' });
    Comment.belongsTo(User, { foreignKey: 'userId', as: 'author' });

    Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
    Comment.belongsTo(Post, { foreignKey: 'postId' });
};
