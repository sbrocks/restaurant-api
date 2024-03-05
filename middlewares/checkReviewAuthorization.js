const jwt = require('jsonwebtoken');

const checkReviewAuthorization = (req, res, next) => {
    // Get the JWT token from the request headers
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        // Verify the JWT token and extract the payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Extract the user role from the decoded payload
        const userRole = decoded.role;

        // Check user role and method to determine authorization
        switch (userRole) {
            case 'admin':
                // Admin has full access
                return next();
            case 'business_owner':
                // Business Owners are not authorized to create or delete reviews
                if (req.method === 'POST' || req.method === 'DELETE') {
                    return res.status(403).json({ error: 'Business Owners are not authorized to create or delete reviews' });
                }
                return next();
            case 'user':
                // Users can create, read, update, and delete reviews
                return next();
            default:
                return res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = checkReviewAuthorization;
