const {JWT_SECRET} = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        console.log(token);
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded);
        req.userId = decoded.userId;
        next();

    } catch (err) {
        return res.status(403).json({});
    }
};

module.exports = {
    authMiddleware
}