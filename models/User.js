const {Schema, model} = require('mongoose');

const User = new Schema({
    username: {type: String, unique:true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}],
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }
    ]
})

module.exports = model('User', User);