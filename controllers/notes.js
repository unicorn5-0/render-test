const Note = require('../models/notes')
const notesRouter = require('express').Router()

notesRouter.get("/", (req, res) => {
    Note.find({}).then((data) => res.json(data))
})

notesRouter.get('/:id', (req, res) => {
    Note.findById(req.params.id )
        .then((data) => {
            if (data) {
                res.json(data)
            } else {
                res.status(404).end()
            }
        })
})

notesRouter.post('/', (req, res, next) => {
    const body = req.body;

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    note.save()
    .then(noteSaved => res.json(noteSaved))
    .catch(err => next(err))
})

notesRouter.delete('/:id', (req, res, next) => {
    Note.findByIdAndRemove(req.params.id)
        .then((result) => res.status(204).end())
        .catch(err => next(err))
})

notesRouter.put('/', (req, res, next) => {
    const body = req.body;

    const note = {
        content: body.content,
        important: body.important
    }

    Note.findByIdAndUpdate(req.params.id, note, {new: true})
        .then((updatedNote) => res.json(updatedNote))
        .catch(err => next(err))
})

module.exports = notesRouter;