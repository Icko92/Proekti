const jwt = require('jsonwebtoken');
const userQuery = require('../users/query')

const logger = (req, res, next) =>{
    console.log(`Logged ${req.url} - ${req.method} --- ${new Date}`);
    next();
};

const wrongRoute = (req, res, next) =>{
    let error = new Error('Not found. Please try with another route!');
    error.status = 404;
    next(error);
};

const errorHandler = (error, req, res, next) =>{
    let errorObj = {
        status: error.status,
        error: {
            message: error.message
        }
    };
    res.status(error.status).json(errorObj)
}

verifyToken = async (req, res, next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decode;
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Not Authorised"
        })
    }
};
isAdmin = async (req, res, next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decode;
        const id = decode.user_id
        const user = await userQuery.getSpecificUserQuery(id);
        if(user[0].is_admin != 1){
            return res.status(401).json({
                message: "Not Authorised"
            })
        }
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Not Authorised"
        })
    }
};


module.exports = {logger, wrongRoute, errorHandler, verifyToken, isAdmin}