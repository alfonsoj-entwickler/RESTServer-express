const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'name is mandatory']
    },
    email: {
        type: String,
        required: [true, 'email is mandatory'],
        unique: true
    },
    pass: {
        type: String,
        required: [true, 'pass is mandatory']
    },
    img: {
        type: String, 
    },
    role: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

userSchema.methods.toJSON = function() {
    const { __v, pass, ...user } = this.toObject();
    return user;
}

module.exports = model('User', userSchema);