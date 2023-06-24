const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async(role='')=> {
    const registedRole = await Role.findOne({ role });
    if( !registedRole ) {
        throw new Error(`This role ${role} is not valid`);
    }
}

// verify email
const registeredEmail = async(email='') => {
    const checkEmail = await User.findOne({ email });
    if( checkEmail ) {
        throw new Error(`This email ${role} already exists`); 
    }
}

// verify mongo id
const existsUserId = async(id='') => {
    const existsUser = await User.findById(id);
    if( !existsUser ) {
        throw new Error(`This user ${id} not exists`); 
    }
}

module.exports = {
    isRoleValid,
    registeredEmail,
    existsUserId
}