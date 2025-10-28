import jwt from "jsonwebtoken"

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
    try {
        // Get token from Authorization header
        const token = req.headers.authorization?.split(" ")[1];

        // If no token provided, deny access
        if (!token) {
            return res.status(401).json({ success: false, message: "Access denied, no token provided " });
        }

        // Verify token using JWT secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach decoded user info to request object
        req.user = decoded;

        // Proceed to next middleware or route
        next();

    } catch (err) {
        // If token invalid or expired, return error
        return res.status(403).json({ success: false, message: "Invalid or expired token please login" })
    }
}
