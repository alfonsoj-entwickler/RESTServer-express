const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async( req = request, res = response, next ) => {
    const token = req.header('x-token');
    //console.log(token);
    if( !token ) {
        return res.status(401).json({
            msg: 'Token is not valid'
        })
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // read the users uid
        const user = await User.findById( uid );

        
        if( !user ) {
            return res.status(401).json({
                msg: 'Token is not valid - The user not exists DB'
            })
        }
        // verify if the uid has status true
        if( !user.status ) {
            return res.status(401).json({
                msg: 'Token is not valid - The user is false'
            })
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token is not valid'
        })
    }
    
}

module.exports = {
    validateJWT
}