const jwt = require('jsonwebtoken');

const revokedTokens = new Set();

exports.revokedTokens = revokedTokens;

exports.auth = (req, res, next) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authentification requise' });
    }

    const token = header.slice('Bearer '.length);

    if (revokedTokens.has(token)) {
        return res.status(401).json({ error: 'Jeton révoqué' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_KEY);
        req.payload = payload;
        req.token = token;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Jeton invalide' });
    }
};
