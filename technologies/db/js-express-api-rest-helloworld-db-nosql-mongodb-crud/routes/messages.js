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

module.exports = router