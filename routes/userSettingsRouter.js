const Router = require('express');
const router = new Router();
const controller = require('../controllers/userSettingsController');
const {check} = require("express-validator");

const checkPassword = [
    check('newPassword', "Password should be 6 or longer and 14 or shorter").isLength({min: 6, max: 14})
]

router.put('/resetPassword', checkPassword, controller.resetPassword);


module.exports = router;