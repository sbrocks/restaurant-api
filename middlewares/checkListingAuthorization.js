const jwt = require('jsonwebtoken');

const checkListingAuthorization = (req, res, next) => {
    // Get the JWT token from the request headers
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        // Verify the JWT token and extract the payload
        const decoded = jwt.verify(token, 'your_jwt_secret_key');

        // Extract the user role from the decoded payload
        const userRole = decoded.role;

        // Check user role and method to determine authorization
        switch (userRole) {
            case 'admin':
                // Admin has full access
                return next();
            case 'business_owner':
                // Business Owners can create, read, and update listings but cannot delete
                if (req.method === 'DELETE') {
                    return res.status(403).json({ error: 'Business Owners are not authorized to delete listings' });
                }
                return next();
            case 'user':
                // Users can only read listings
                if (req.method !== 'GET') {
                    return res.status(403).json({ error: 'Users are only authorized to read listings' });
                }
                return next();
            default:
                return res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = checkListingAuthorization;
