const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs'); 
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if( !user ) {
            return res.status(400).json({
                msg: 'User / Password are not valid - email'
            })
        }

        if( !user.state ) {
            return res.status(400).json({
                msg: 'User / Password are not valid - state false'
            })
        }

        const validPassword = bcryptjs.compareSync( password, user.pass );
        if( !validPassword ) {
            return res.status(400).json({
                msg: 'User / Password are not valid - password'
            })
        }

        const token = await generateJWT(user.id);

        res.json({
            msg: 'Login Okay',
            user,
            token
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'contact with admin'
        })
    }
}

const googleSignIn = async( req, res = response ) => {
    const { id_token } = req.body;

    try {
        const googleUser = await googleVerify(id_token);

        //console.log(googleUser);

        res.json({
            msg: 'Google Sign In verified!',
            id_token
        })
    } catch (error) {
        json.status(400).json({
            ok: false,
            msg: 'The token was not verify'
        })
    }

    
}

module.exports = {
    login,
    googleSignIn
};