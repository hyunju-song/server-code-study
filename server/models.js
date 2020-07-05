//request-handler 내의 핸들러 이벤트 중, 클라이언트에서 받은 데이터를
//내보내거나 보관하는 코드를 따로 분리하여 작성

const messagesAll = { 
    messages: [] 
};

const getMessageModels = function() {
  return messagesAll.messages;
};
const postMessageModels = function(message) {
  messagesAll.messages.push(message); 
  return messagesAll.messages;
};

module.exports = {
  getMessageModels,
  postMessageModels
};