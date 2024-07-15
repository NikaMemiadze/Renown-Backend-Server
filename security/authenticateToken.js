const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    jwt.verify(token.replace('Bearer ', ''), 'secretkey123', (err, user) => {
        if (err) {
            console.error('JWT Verification Error:', err);
            return res.status(403).json({ error: 'Token verification failed' });
        }
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };