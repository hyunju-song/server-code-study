const express = require('express');
const app = express();
/*
express.Router()의 의미
: 이를 이용해서 router로 분리할 수 있다. (이전처럼 if문을 복잡하게 쓰지 않아도 된다.)\
이렇게 분리할 수 있게 만든 router는 line 109의 module.export를 통해 모듈로 만들어지고,
이를 통해 다른 파일에서 require하여 사용할 수 있다. 
*/
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser')

app.use(cors);
app.use(bodyParser);

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

var corsOptions = {
  origin: '*' ,
  methods: 'GET, PUT, POST',
  allowedHeaders: 'Content-Type, Accept',
  maxAge: 10
  //optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

let messageAll = {
  messages : []
};

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get('/messages',cors(corsOptions),function(req,res){
  res.send(messageAll.messages)
   //아까는 res.send(JSON.stringify(results.results));라고 되어있었는데, JSON.stringify를 해주지 않아도 잘 된다. 왜일까?
  //res.send에 .writeHead,.end, JSON.stringify모두 되어있는 것인가? 
  //=> res.send(object)로 코드를 실행했을 때 함수의 실행 순서는 
  /*
  res.send(object)
  res.json(object)
  res.send(string) 이다. 그래서 굳이 JSON.stringify를 해주지 않아도 되는 것이다. 
  */ 
  //console.log("JSON.stringfy results.results:",JSON.stringify(results.results)); => 결과: JSON.stringfy results.results: [{"username":"ㄴ","text":"ㄴ","roomname":"코드스테이츠"}]

});
router.post('/messages',cors(corsOptions),function(req,res){
  let message = req.body;
  messageAll.messages.push(message);
  res.send(messageAll.messages)
});
router.options('/messages', cors(corsOptions))

router.use(function(req, res) {
  res.status(404).send('Sorry cant find that!');
});
//+ 맨뒤에 에러처리 middleware을 붙여준다. 왜냐하면 middleware는 
//순차적으로 처리하는데 여기까지 내려왔다는건 처리를 못하고 에러가 났다는 거니까

module.exports = router;
