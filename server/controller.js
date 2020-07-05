//해당 핸들러 이벤트는, 클라이언트에 응답할때, status 코드와 
//응답 메시지를 정의

const models = require('./models');

const getMessageController = function(req, res) {
  let message = models.getMessageModels();
  res.status(200).send(message);
};

const postMessageController = function(req, res) {
  let body = req.body
    //const { body } = req; 
  let message = models.postMessageModels(body);
  res.status(201).send(message);
};

module.exports = {
  getMessageController,
  postMessageController
};