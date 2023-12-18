const Router = require('express');
const router = new Router();
const controller = require('../controllers/userController');
const taskRouter = require('./taskRouter');
const settingsRouter = require('./userSettingsRouter');

router.use('/task', taskRouter);
router.use('/settings', settingsRouter);

router.get('/getUsername', controller.getUsername);

module.exports = router;