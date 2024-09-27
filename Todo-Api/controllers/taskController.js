const Task = require('../models/Task')

exports.createTask = async (req, res) => {
    const { subject } = req.body
    const newTask = new Task({
        userId: req.user.id,
        subject
    })

    try {
        await newTask.save()
        res.status(201).json({
            message: 'Created task success',
            data: newTask
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        })
    }
}

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({userId: req.user.id})
        res.status(200).json({
            message: 'Get Task list success',
            data: tasks,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        })
    }
}

exports.updateTask = async (req, res) => {
    const { id } = req.params
    const { status } = req.body

    try {
        const task = await Task.findByIdAndUpdate(id, { status: status}, {new: true})
        res.status(200).json({
            message: 'Update Task success',
            data: task
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        })
    }
}

exports.deleteTask = async (req, res) => {
    const { id } = req.params

    try {
        const task = await Task.findByIdAndDelete(id)
        res.status(200).json({message: 'Task deleted'})
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        })
    }
}