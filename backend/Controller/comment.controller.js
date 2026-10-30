const Post = require('../Model/post.model.js');
const Comment = require('../Model/comment.model.js');
const User = require('../Model/user.model.js');

exports.create = async (req, res) => {
    const post = await Post.findByPk(req.params.postId);
    if (!post) {
        return res.status(404).json({ error: 'Publication introuvable' });
    }

    const content = (req.body.content || '').trim();
    if (content.length < 1 || content.length > 500) {
        return res.status(400).json({ error: 'Le commentaire doit contenir entre 1 et 500 caractères' });
    }

    const comment = await Comment.create({
        content,
        userId: req.payload.id,
        postId: post.id
    });

    const full = await Comment.findByPk(comment.id, {
        include: [{ model: User, as: 'author', attributes: ['id', 'username'] }]
    });

    return res.status(201).json(full);
};
