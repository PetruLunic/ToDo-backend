const jwt = require('jsonwebtoken');
const {secret} = require('../config');

module.exports = function(req, res, next){
    if (req.method === "OPTIONS") {
        next();
    }

    try{
        const token = req.headers.authorization.split(' ')[1];
        if (!token){
            return res.status(401).json({message: "User is unauthorized"});
        }

        req.user = jwt.verify(token, secret);
        next();
    } catch(e){
        return res.status(401).json({message: "User is unauthorized"});
    }
}