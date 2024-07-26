const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        next();
    };
};

const authenticate = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ error: 'Access Denied' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        console.log(`Token received: ${token}`);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(`Decoded token: ${JSON.stringify(decoded)}`);
        
        let user;

        // Fetch the user based on the decoded token data
        if (decoded.role === 'student' || decoded.role === 'admin') {
            user = await User.findOne({ where: { userId: decoded.userId } });
        }

        // If user is not found, return an error
        if (!user) {
            console.log('User not found');
            throw new Error('User not found');
        }

        req.user = user; // Attach user to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.log(`Error verifying token: ${error.message}`);
        res.status(401).json({ error: 'Invalid Token' });
    }
};

module.exports = {
    authenticate,
    checkRole
};