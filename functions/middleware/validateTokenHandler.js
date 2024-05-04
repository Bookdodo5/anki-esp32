const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
    res.status(401);
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader?.startsWith("Bearer")) {
        let token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err) {
                throw new Error('User is not authorized');
            }
            req.user = user;
            next();
        });
    } else {
        throw new Error('No token found');
    }
});

module.exports = validateToken;