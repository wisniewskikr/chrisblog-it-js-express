const express = require('express')
const router = express.Router()
const Message = require('../models/message')

// Getting all
router.get('/', async (req, res) => {
  try {
    const subscribers = await Message.find()
    res.json(subscribers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getMessage, (req, res) => {
  res.json(res.message)
})
 
// Creating one
router.post('/', async (req, res) => {
const message = new Message({
    text: req.body.text
})
try {
    const newMessage = await message.save()
    res.status(201).json(newMessage)
} catch (err) {
    res.status(400).json({ message: err.message })
}
})

// Updating One
router.put('/', getMessageFromBody, async (req, res) => {
  if (req.body.text != null) {
    res.message.text = req.body.text
  }
  try {
    const updatedMessage = await res.message.save()
    res.json(updatedMessage)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getMessage, async (req, res) => {
  try {
    await res.message.deleteOne({ _id: req.params.id})
    res.json({ message: 'Deleted Message' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getMessage(req, res, next) {
  let message
  try {
    message = await Message.findById(req.params.id)
    if (message == null) {
      return res.status(404).json({ message: 'Cannot find message' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.message = message
  next()
}

async function getMessageFromBody(req, res, next) {
  let message
  try {
    message = await Message.findById(req.body._id)
    if (message == null) {
      return res.status(404).json({ message: 'Cannot find message' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.message = message
  next()
}

module.exports = router