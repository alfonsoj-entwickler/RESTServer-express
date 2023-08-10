const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login', [
    check('email', 'email is mandatory').isEmail(),
    check('password', 'password is mandatory').not().isEmpty(),
    validateFields
],
login);


module.exports = router;