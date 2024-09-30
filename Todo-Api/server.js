const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))

app.use(morgan('dev'))
app.use(express.json())

const mongoURI = process.env.MONGODB_URI || 'mongodb://mongo:27017/todo_app?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.1'

mongoose.connect(mongoURI)
.then(() => {
    console.log('MongoDB Connected!')
})
.catch((err) => {
    console.error(err)
})

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/tasks', taskRoutes)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})