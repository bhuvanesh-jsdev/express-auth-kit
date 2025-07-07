const jwt = require('jsonwebtken');
const secret_key =process.env.JWT_SECRET;
function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token, secret_key);
        req.user = verified; // Store user info in request
        next();
    } catch (err) {
        res.status(401).send('Invalid Token');
    }
}
module.exports = authMiddleware;