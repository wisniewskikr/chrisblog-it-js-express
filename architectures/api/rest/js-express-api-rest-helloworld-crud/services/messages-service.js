let messages = [];
let messageId = 1;

module.exports = {
    getAll: function () {
      return messages;
    },
    getById: function (id) {
        return messages.find((c) => c.id == id);
    }, 
    create: function (text) {
      const message = JSON.parse(`{"id": ${messageId}, "text": "${text}"}`)
      messages.push(message);
      messageId++;
    },
    update: function (message) {
      messages = messages.filter((c) => c.id != message.id);
      messages.push(message);
    },
    delete: function (id) {
      messages = messages.filter((c) => c.id != id);
    }
};