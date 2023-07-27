const jwt = require('jsonwebtoken');

// Generate a JWT token for a user
const generateToken = (user) => {
    const secretKey = process.env.JWT_SECRET;
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
    };

    const options = {
        expiresIn: '1h', // Token expiration time, e.g., '1h' (1 hour)
    };

    return jwt.sign(payload, secretKey, options);
};

module.exports = generateToken;
