const User = require("../models/userModel");
const jwt = require('jsonwebtoken')

exports.authenticateToken = (req, res, next) => {
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

exports.deleteAccount = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const user = await User.findByIdAndDelete(userId);

        if (!user) return next(new createError("User not found!", 404));

        res.status(200).json({ message: "User successfully deleted" });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}