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
const express = require('express');
const app = express();
const router = require('./request-handler')

app.use(router)

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


