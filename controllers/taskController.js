const User = require('../models/User.js');
const Task = require('../models/Task.js');
const {validationResult} = require("express-validator");

class TaskController{

    async new(req,res){
        try{
            const errors = validationResult(req);

            if (!errors.isEmpty()){
                const errorsMsg = errors.array().map(error => error.msg);
                return res.status(400).json({message: "New task error", errors: errorsMsg});
            }

            const user = await User.findById(req.user.id);

            const {text, checked} = req.body;
            const task = new Task({text, checked});
            await task.save();

            user.tasks.push(task);
            await user.save();

            return res.status(200).json(task._id);
        }catch(e){
            console.log(e);
            res.status(400).json({message: 'New task error'});
        }
    }

    async getAll(req,res){
        try{
            const user = await User.findById(req.user.id);

            res.json(await Task.find({ _id: { $in: user.tasks } }));
        }
        catch(e){
            console.log(e);
            res.status(400).json({message: 'Get all tasks error'});
        }
    }

    async delete(req, res){
        try {
            const {id} = req.body;
            if (!id) {
                return res.status(400).json({message: "Task id not found"});
            }

            const user = await User.findOne({_id: req.user.id, tasks: id});
            if (!user) {
                return res.status(400).json({message: "Task was not found in user's tasks"});
            }

            try {
                await User.findByIdAndUpdate(req.user.id, {$pull: {tasks: id}})
                await Task.findByIdAndRemove(id);
            } catch (e) {
                console.log(e);
                return res.status(400).json({message: "Task id not valid"});
            }

            return res.json({message: `Task ${id} was removed`});
        } catch(e){
            console.log(e);
            res.status(400).json({message: `Error at deleting task`});
        }
    }

    async check(req, res){
        try{
            const {id} = req.body;

            if (!id) {
                return res.status(400).json({message: "Task id not found"});
            }

            const user = await User.findOne({_id: req.user.id, tasks: id});
            if (!user) {
                return res.status(400).json({message: "Task was not found in user's tasks"});
            }

            const task = await Task.findById(id);
            task.checked = !task.checked;
            await task.save();

            return res.json({message: `Task ${id} was checked`});

        } catch(e){
            console.log(e);
            res.status(400).json({message: "Error at checking task"});
        }
    }

    async edit(req, res){
        try{
            const {id, text} = req.body;

            if (!id) {
                return res.status(400).json({message: "Task id not found"});
            }

            const user = await User.findOne({_id: req.user.id, tasks: id});
            if (!user) {
                return res.status(400).json({message: "Task was not found in user's tasks"});
            }

            const task = await Task.findById(id);
            task.text = text;
            await task.save();

            return res.json({message: `Task ${id} was edited`});

        } catch(e){
            console.log(e);
            res.status(400).json({message: "Error at editing task"});
        }
    }

    async deleteAllChecked(req, res){
        try{
            const user = await User.findById(req.user.id);
            await Task.deleteMany({ _id: { $in: user.tasks }, checked: true });

            return res.json({message: "All checked tasks was removed"});
        }
        catch(e){
            console.log(e);
            return res.status(400).json({message: "Error at deleting all checked tasks"});
        }
    }
}

module.exports = new TaskController();