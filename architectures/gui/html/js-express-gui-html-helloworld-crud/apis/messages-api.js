const Info = require('../models/info')
const messagesService = require('../services/messages-service');

module.exports = {        
    handleDelete: function (req, res) {

        const messageId = parseInt(req.url.substring(req.url.lastIndexOf('/') + 1));
        if (isNaN(messageId)) {
            displayMessage(null, res, 404);
            return;
        }

        const messageCurrent = messagesService.getById(messageId);
        if (!messageCurrent) {
            displayMessage(null, res, 404);
            return; 
        }

        messagesService.delete(messageId);
        displayMessage(null, res, 200);

    }

}

function displayMessage(json, res, statusCode) {

    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(json));
  
  }