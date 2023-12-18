const {Schema, model} = require('mongoose');

const Task = new Schema({
    text: {type: String, required: true},
    checked: {type: Boolean, default: false}
})

module.exports = model('Task', Task);