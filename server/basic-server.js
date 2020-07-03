/* node 의 모듈들을 불러옵니다. */
const http = require("http");
// request에 대한 처리는 './request-handler.js'에 있는 모듈에서 처리하게 될 것입니다.
// 현재 requestHandler 정의 되어 있지 않습니다. request-handler.js 에서 해당 모듈을 불러오세요.
const requestHandler = require("./request-handler");

// 모든 서버는 요청을 받을수 있는 포트 번호를 필요로 합니다.
// HTTP server의 표준 포트는 보통 80 번 이지만, 보통 다른 서버에서 사용중이기 때문에 접근할 수 없습니다.
// 따라서 우리는 보통 테스트 서버 포트로 3000, 8080, 1337 등을 활용합니다.
// PORT는 아파트의 호수와도 같습니다. 서버로 요청을 받기 위해서는 다음과 같이 포트 번호를 설정 합니다.
// (* 때에 따라 다른 포트번호를 열고 싶다면, 환경 변수를 활용 하기도 합니다.)
const port = 3000;

// 아마 지금 개발 서버를 켠다면 본인의 로컬 머신에서 구동 중 일겁니다.따라서 기본적인 IP adress 는 127.0.0.1 입니다.
// 로컬 서버 ip인 127.0.0.1은 localhost라는 이름으로 대체 될 수 있습니다.
const ip = "127.0.0.1";

// 서버를 열기 위해 nodejs 의 http 모듈을 사용할 것 입니다.
// http.createServer 로 생성된 서버는 모든 incoming requests를 처리할 것 입니다.
const server = http.createServer(requestHandler);

//서버를 만든 후 우리는 어떤 IP 와 포트 에서 listen 할 것인지 지정 해 주어야 합니다.
//console.log("Listening on http://" + ip + ":" + port); //확인용
server.listen(port, ip);// server.listen() 은 node 서버가 계속해서 돌게끔 프로세스를 유지합니다.

module.exports = server;
