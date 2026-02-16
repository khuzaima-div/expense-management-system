const allowRoles = (...roles) => {
    return (req, res, next) => {
        // Safe check: Pehle dekhein ke req.user exit karta hai ya nahi
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Access Denied: Your role (${req.user?.role || 'Guest'}) is not authorized for this route.`
            });
        }
        next();
    };
};

module.exports = allowRoles;