const jwt = require('jsonwebtoken')

exports.protect = (req, res, next) => {
    const authHeader = request.headers.authorization;

    if(!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id };
        next()
    } catch (err) {
        console.error('JWT error:', err);
        res.status(401).json({ message: 'Token is invalid or expired' });
    }
}