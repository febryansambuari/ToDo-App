const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    subject: {type: String, required: true},
    status: {type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo'},
})

module.exports = mongoose.model('Task', taskSchema)