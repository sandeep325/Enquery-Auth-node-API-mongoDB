const { check } = require('express-validator');

exports.signupValidation = [
    check('username', 'Username is requied').not().isEmpty(),
    check('email', 'Please provide a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password must be 8 or more characters').isLength({ min: 8 }),
    check('mobile', "mobile number must be numeric.").isNumeric(),
    check('mobile', 'Mobile number must be 10  digit').isLength({ min: 10,max:10 }),
]

exports.LoginValidation = [
    check('email', 'Please provide a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password must be 8 or more characters').isLength({ min: 8 }),
]

exports.changePassValidator = [
    check('id','id is requied').not().isEmpty(),
    check('old_password', 'Password must be 8 or more characters').isLength({ min: 8 }),
    check('password', 'Password must be 8 or more characters').isLength({ min: 8 }),
]