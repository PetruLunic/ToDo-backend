const Router = require('express');
const router = new Router();
const controller = require('../controllers/authController.js');
const {check} = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/registration', [
    check('username', "Username should be 2 or longer").isLength({min: 2, max: 30}),
    check('password', "Password should be 6 or longer and 14 or shorter").isLength({min: 6, max: 14})
], controller.registration);

router.post('/login', controller.login);

router.get('/users', roleMiddleware(["ADMIN"]), controller.getUsers);

module.exports = router;