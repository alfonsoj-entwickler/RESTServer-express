const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validateRole = async( req = request, res = response, next ) => {
    if( !req.user ){
        return res.status(500).json({
            msg: 'Error - Verify the role without validating the token first'
        })
    }

    const { role, name } = req.user;

    if( role !== "ADMIN_ROLE" ) {
        return res.status(401).json({
            msg: `Error - ${name} is not admin`
        })
    }

    next();
    
}


const hasRole = ( ...roles ) => {
     
    return ( req = request, res = response, next ) => {
        if( !req.user ){
            return res.status(500).json({
                msg: 'Error - Verify the role without validating the token first'
            })
        }

        if( roles.includes(req.user.role) ) {
            return res.status(401).json({
                msg: 'Error - This role is not accept'
            })
        }
        next();
    }
}

module.exports = {
    validateRole,
    hasRole
}