const User = require('../Model/user.model.js');
const Post = require('../Model/post.model.js');
const Comment = require('../Model/comment.model.js');

function associate() {
    // Un utilisateur a plusieurs publications
    User.hasMany(Post, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Post.belongsTo(User, { as: 'author', foreignKey: 'userId' });

    // Un utilisateur a plusieurs commentaires
    User.hasMany(Comment, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Comment.belongsTo(User, { as: 'author', foreignKey: 'userId' });

    // Une publication a plusieurs commentaires
    Post.hasMany(Comment, { as: 'comments', foreignKey: 'postId', onDelete: 'CASCADE' });
    Comment.belongsTo(Post, { foreignKey: 'postId' });
}

module.exports = { associate, User, Post, Comment };
