const { Schema, model } = require('mongoose');

const roleSchema = Schema({
    role: {
        type: String,
        required: [true, 'The role is mandatory']
    }
});

module.exports = model('Role', roleSchema);