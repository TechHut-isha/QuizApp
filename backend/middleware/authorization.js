const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ');
        if (token[0] === 'Bearer' && jwt.verify(token[1], process.env.SECERET_KEY)) {
            next();
        }
    }catch(e){
        if(e.name === 'JsonWebTokenError'){
            res.status(400).send('Unauthorized Access Denied!');
        }else{
            res.status(400).send('Unauthorized Access Denied!');
        }
    }
    
}
module.exports = auth;