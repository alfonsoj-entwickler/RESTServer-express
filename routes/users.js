const { Router } = require('express');
const { check } = require('express-validator');
const { isRoleValid, registeredEmail, existsUserId } = require('../helpers/db-validators');
const { usersGet, usersPut, usersPost, usersDelete, usersPatch } = require('../controllers/users');
const { validateFields, validateJWT, hasRole } = require('../middlewares');
 

const router = Router();

router.get('/', usersGet);

router.put('/:id', [
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom( existsUserId ),
    check('role').custom( isRoleValid ),
    validateFields
], usersPut);

router.post('/', [
    check('name', 'The name is mandatory').not().isEmpty(),
    check('pass', 'The password is mandatory').isLength({min: 6}),
    check('email', 'This email is not valid').isEmail(),
    check('email').custom( registeredEmail ),
    check('role').custom( isRoleValid ),
    validateFields
]
,usersPost);

router.delete('/:id',[
    validateJWT,
    //validateRole,
    hasRole('ADMIN_ROLE', 'USER1_ROLE'),
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom( existsUserId ),
    validateFields
], usersDelete);

module.exports = router;