/*************************************************************

request handler 함수를 여기서 작성합니다.

reuqestHandler 함수는 이미 basic-server.js 파일에서 사용 했지만, 아직 작동하지 않습니다.

requestHandler 함수를 export 하여 basic-server.js 에서 사용 할 수 있게 하세요

**************************************************************/
const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser')
app.use(cors);

var corsOptions = {
  origin: '*' ,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

let messages = [];

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get('/',cors(corsOptions),function(req,res){
  res.send(JSON.stringify(messages))
});
router.post('/',cors(corsOptions),function(req,res){
  let message = req.body;
  messages.push(message);
  res.send(messages)
});
router.options('/', cors(corsOptions))


module.exports = router;


// let messages = {
//   message : []
// };
// let message = [];
// //한글로 데이터 입력할때, 데이터 깨지고 업데이트도 느려짐
// const requestHandler = function(request, response) {
//   request.setEncoding('utf-8')
//   // 기본 CORS 설정이 되어있는 코드 입니다. 아래에 있습니다.
//   // CORS에 대해서는 조금더 알아보세요.
//   let headers = defaultCorsHeaders;
//   // 응답 헤더에 응답하는 컨텐츠의 자료 타입을 헤더에 기록 합니다.
//   headers["Content-Type"] = "application/json";
//   // 노드 서버에 대한 모든 요청은 응답이 있어야 합니다. response.end 메소드는 요청에 대한 응답을 보내줍니다.

//   //console.log(message);
//   if(request.method === 'POST'){
//     response.writeHead(201, headers); 
//     request.on('data', (chunk) => {
//       message.push(JSON.parse(chunk));
//     })
//     .on('end', () => {
//       response.end(JSON.stringify(message));
//     })
//   }
//   else if(request.method === 'OPTIONS'){
//     response.writeHead(200, headers);
//     response.end();
//   }
//   else if(request.method === 'GET'){
//     response.writeHead(200, headers);
//     response.end(JSON.stringify(message));
//     //console.log(JSON.stringify(message))
//   }
//   else{
//     response.writeHead(404, headers);
//     response.end("method error");
//   }
// };

// const defaultCorsHeaders = {
//   "access-control-allow-origin": "*",
//   "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "access-control-allow-headers": "content-type, accept",
//   "access-control-max-age": 10 // Seconds.
// };

// module.exports = requestHandler;
 