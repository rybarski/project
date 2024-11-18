// middleware/roleMiddleware.js
const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            console.log('User object not attached to request');
            return res.status(403).json({ message: 'User not authenticated' });
        }

        console.log('User role:', req.user.role); // Log role for debugging
        if (!allowedRoles.includes(req.user.role)) {
            console.log('User role is not authorized');
            return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }

        next();
    };
};

module.exports = roleMiddleware;
