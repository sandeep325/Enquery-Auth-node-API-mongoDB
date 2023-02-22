const { check } = require('express-validator');

exports.EnqueryValidator=[
    // check('GuestName','Guest name is required').not().isEmpty(),
    // check('GuestName','Guest name sholud  be min 4 and max 20 character.').toString({ min: 5, max: 5 }),
    check('GuestName')
   .isLength({min:5,max:20}).withMessage('Guest Name must be  between 3 characters long or 20 characters min.')
   .matches(/^[A-Za-z\s]+$/).withMessage('Guest Name must be alphabetic.'),

   check('Email', 'Please provide a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),

   check("Phone").isNumeric().withMessage('Mobile number should be numeric.')
           .isLength({ min: 10,max:10 }).withMessage('Mobile number must be 10 digit.'),

    check("Message").not().isEmpty().withMessage("Message can not  be blank."),

    check("Country").not().isEmpty().withMessage("Country can not be blank.")
    .isLength({min:3,max:25}).withMessage("Country name is too long.")
    .matches(/^[A-Za-z\s]+$/).withMessage('Country Name must be alphabetic.'), 

         check("State").not().isEmpty().withMessage("State can not be blank.")
         .isLength({min:3,max:25}).withMessage("State name is too long.")
         .matches(/^[A-Za-z\s]+$/).withMessage('State Name must be alphabetic.'), 

        check("Zipcode").not().isEmpty().withMessage("Zip code can not be blank.")
        .isLength({min:3,max:12}).withMessage('Zip code lenght can not grater then 12.'),     
];