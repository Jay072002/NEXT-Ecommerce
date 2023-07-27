const jwt = require('jsonwebtoken');

// Middleware to authenticate token
export const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, 'your_secret_key', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        // Attach the user object to the request for use in subsequent routes
        req.user = user;
        next();
    });
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    const { role } = req.user;
    if (role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only' });
    }
    next();
};

module.exports = {
    authenticateToken,
    isAdmin,
};
