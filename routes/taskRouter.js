const Router = require('express');
const router = new Router();
const controller = require('../controllers/taskController');
const {check} = require('express-validator');

const checkNewTask = [
    check("text", "Task text should not be empty").notEmpty()
]

router.post('/new', checkNewTask, controller.new);
router.put('/check', controller.check);
router.delete('/delete', controller.delete);
router.put('/edit', checkNewTask, controller.edit);
router.get('/getAll', controller.getAll);
router.delete('/deleteAllChecked', controller.deleteAllChecked)

module.exports = router;