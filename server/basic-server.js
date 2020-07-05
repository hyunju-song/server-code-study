/*
기존에는 const http = requie("http");
const requestHandler = require("./request-handler");
const server = http.createServer(requestHandler);
로 node.js의 내장 모듈인 http 모듈을 이용하여 유저가 클릭하거나 네트워크 리소스를 요청시 nonblocking input/output이 이루어지게 하였다면, 

express는 이 http모듈을 express 서버 프레임워크를 사용해서 리펙톨링한다. 
즉, http모듈이 express에 내장되어 있기 때문에 http를 import할 필요 없이
const express = require('express'); 로 express모듈을 import하고
const app = express(); express를 실행시킨 후
const router = require("./request-handler");
app.use(router); //로 http.createServer역할을 대신한다. 
*/
/*
middleware - bodyParser
parsing(parse)는 가지고 있는 데이터를 내가 원하는 형태의 데이터로 '가공'하는 과정을 말한다. 
body-Parser가 특정 문자를 기준으로 파싱하여파싱한 결과 body에 오브젝트 형태로 데이터가 담기고, 그러면 req.body에 이 객체를 저장한다. 
그래서 클라이언트 측에서 { name: 'yejinh', job: ...} 와 같은 JSON 형식의 바디를 보내면 
서버 측에서 req.body 혹은 req.body.name, req.body.job 등으로 해당 데이터에 곧바로 접근할 수 있게 된다.

즉, 이전의 
let message = ''
request.on('data', (chunk) => {
  message += chunk;
})
.on('end', () => {
  var post = JSON.parse(message);
에 해당하는 부분이

express를 사용하면 
const bodyParser = require('body-parser');
router.use(bodyParser.json());
let message = req.body;
로 바뀝니다. 
*/

/*
CORS
이전의 CORS부분은
const headers = defaultCorsHeaders;
const defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
express에서는
참고: https://github.com/expressjs/cors
  origin: Access-Control-Allow-Origin CORS 헤더를 구성.
  methods: Access-Control-Allow-Methods CORS 헤더를 구성합니다. 쉼표로 구분 된 문자열 (예 : 'GET, PUT, POST') 
  또는 배열 (예 :)이 필요 ['GET', 'PUT', 'POST']합니다.
  allowedHeaders: Access-Control-Allow-Headers CORS 헤더를 구성.
  exposedHeaders: Access-Control-Expose-Headers CORS 헤더를 구성. 
  credentials: Access-Control-Allow-Credentials CORS 헤더를 구성.
  maxAge: Access-Control-Max-Age CORS 헤더를 구성.
  그리고 이들은 배열이나 **쉼표** 로 구분된 문자열로 지정해주면 됩니다. 
그래서 이전부분과 같게 하려면
*/

const express = require('express');
const app = express();
const router = require('./routers')

app.use('/', router)

/*
NODE_ENV는 2가지 값(production(배포 모드), development(개발 모드))을 가진다. 
express는 이 모드가 무엇이냐에 따라 그 모드에 도움을 주는 환경으로 알아서 설정한다. 
참고: https://velog.io/@yhe228/2020-02-08-1102-%EC%9E%91%EC%84%B1%EB%90%A8-o7k6czx831

현 sprint에서는 필요없다고 판단하여 주석처리하고, line 29~32 처럼 코딩하였다. 
*/
//const PORT = process.env.NODE_ENV === "development"? 3000:3001;
//console.log("현재 모드 : ", process.env.NODE_ENV);

const PORT = 3000;
app.listen(PORT, () => {
  //console.log(`server listen on ${PORT}`);
});

module.exports = app;


