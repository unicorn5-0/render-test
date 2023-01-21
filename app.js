const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const url = 'mongodb+srv://wizard5-0:wizardry5.0@cluster0.3nqdycw.mongodb.net/noteApp?retryWrites=true&w=majority'

logger.info('connecting to', config.MONGODB_URI || url)
mongoose.connect(config.MONGODB_URI || url)
        .then(() => logger.info('connected to MongoDB'))
        .catch(err => logger.error('error connecting to MongoDB:', err.message))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app;