const { response, request } = require('express');
const bcryptjs = require('bcryptjs'); 
const User = require('../models/user');

const usersGet = async (req = request, res = response ) => {

    const { max = 5, from = 0 } = req.query;
    const myQuery = { state: true };
    const [ summary, users ]  = await Promise.all([
        User.countDocuments(myQuery),
        User.find(myQuery).skip(Number(from)).limit(Number(max))
    ]);

    res.json({
        msg: 'get API - controller',
        summary,
        users
    });
};

const usersPut = async (req = request, res = response ) => {
    const { id }= req.params;
    const { _id, pass, google, email, ...rest } = req.body;

    if( pass ) {
        const salt = bcryptjs.genSaltSync();
        rest.pass = bcryptjs.hashSync( pass, salt );
    }
    
    const user = await User.findByIdAndUpdate( id, rest );
    

    res.json({
        msg: 'put API - controller: user updated',
        user
    });
}

const usersPost = async (req = request, res = response ) => {

    const { name, email, pass, role } = req.body;
    const user = new User({
        name, email, pass, role
    });

    // hash password
    const salt = bcryptjs.genSaltSync();
    user.pass = bcryptjs.hashSync( pass, salt );

    await user.save();

    res.json({
        msg: 'post API - controller: user saved',
        user
    })
}

const usersDelete = async (req = request, res = response ) => {
    const { id } = req.params;

    // remove of db
    //const userRemoved = await User.findByIdAndDelete( id );

    const uid = req.uid;

    // user in stand by
    const userStandBy = await User.findByIdAndUpdate(id, {state: false});
    const authUser = req.user;

    res.json({
        msg: 'delete API - controller', 
        userStandBy,
        uid,
        authUser
    })
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
}