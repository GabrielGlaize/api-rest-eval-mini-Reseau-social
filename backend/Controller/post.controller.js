const Post = require('../Model/post.model.js');
const Comment = require('../Model/comment.model.js');
const User = require('../Model/user.model.js');

const postInclude = [
    { model: User, as: 'author', attributes: ['id', 'username'] },
    {
        model: Comment,
        as: 'comments',
        separate: true,
        order: [['createdAt', 'ASC']],
        include: [{ model: User, as: 'author', attributes: ['id', 'username'] }]
    }
];

exports.list = async (req, res) => {
    const posts = await Post.findAll({
        include: postInclude,
        order: [['createdAt', 'DESC']]
    });
    return res.status(200).json(posts);
};

exports.create = async (req, res) => {
    const content = (req.body.content || '').trim();
    if (content.length < 1 || content.length > 2000) {
        return res.status(400).json({ error: 'Le contenu doit contenir entre 1 et 2000 caractères' });
    }

    const post = await Post.create({ content, userId: req.payload.id });
    const full = await Post.findByPk(post.id, { include: postInclude });
    return res.status(201).json(full);
};
