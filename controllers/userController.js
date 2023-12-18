const User = require('../models/User.js');
const Role = require('../models/Role.js');

class UserController{
    async getUsername(req,res){
        const user = await User.findById(req.user.id);
        return res.json(user.username);
    }
}

module.exports = new UserController();