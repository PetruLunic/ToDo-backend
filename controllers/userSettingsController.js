const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const {validationResult} = require("express-validator");

class UserSettingsController{
    async resetPassword(req, res){
        try{
            const errors = validationResult(req);

            if (!errors.isEmpty()){
                const errorsMsg = errors.array().map(error => error.msg);
                return res.status(400).json({message: "Error at reseting password", errors: errorsMsg});
            }

            const user = await User.findById(req.user.id);

            const {oldPassword, newPassword} = req.body;

            // checking old password
            const validPassword = bcrypt.compareSync(oldPassword, user.password);
            if (!validPassword){
                return res.status(400).json({message: "Password is incorrect"});
            }

            // changing the password
            user.password = bcrypt.hashSync(newPassword, 7);
            await user.save();

            return res.json({message: "Password reseted successfully"});
        }
        catch(e){
            console.log(e);
            return res.status(400).json({message: "Error at reseting password"});
        }

    }
}

module.exports = new UserSettingsController();