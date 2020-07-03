/*************************************************************

request handler 함수를 여기서 작성합니다.

reuqestHandler 함수는 이미 basic-server.js 파일에서 사용 했지만, 아직 작동하지 않습니다.

requestHandler 함수를 export 하여 basic-server.js 에서 사용 할 수 있게 하세요

**************************************************************/
let results = {
  results: []
}
const requestHandler = function (request, response) {// node server 의 requestHandler는 항상 request, response를 인자로 받습니다.
  // 기본적인 로그를 작성 하세요. 간단한 로그를 작성 하는 것은, 서버를 디버깅 하는데 매우 수월하게 해줍니다.
  // 아래는 모든 리퀘스트의 메소드와 url을 로깅 해줍니다.
  /* eslint no-console: 0 */
  console.log("Serving request type " + request.method + " for url " + request.url);

  // 기본 CORS 설정이 되어있는 코드 입니다. 아래에 있습니다.
  const headers = defaultCorsHeaders;
  request.setEncoding('utf-8');//이건 무슨역할?
  // 응답 헤더에 응답하는 컨텐츠의 자료 타입을 헤더에 기록 합니다.
  //headers["Content-Type"] = "text/plain";
  headers["Content-Type"] = "application/json";//이렇게 해줘야 한글이 깨지지 않는다. 

  //Routing
  if(request.method === 'OPTIONS'){
    response.writeHead(200, headers);
    response.end()
  }
  else if(request.method === 'POST'){ 
    if(request.url === '/messages'){
      response.writeHead(201, headers);
      let message = '';//message하나 받는다.
      request
      .on('data', (chunk) => {
        console.log('data처리 중');
        message += chunk;
      })
      .on('end',() => {//서버에 message하나 저장
        var post = JSON.parse(message);//.parse: 정보를 객체화
        results.results.push(post);
        response.end(JSON.stringify(message));
      });
    }
    else{
      response.writeHead(404, headers);
      response.end();
    }
  }
  else if(request.method === 'GET'){
    if(request.url === '/messages'){
      response.writeHead(200, headers);
      response.end(JSON.stringify(results));//모든 messasges 즉, results를 보내기
    }
    else{
      response.writeHead(404, headers);
      response.end();
    }
  }
  else{
    response.writeHead(404, headers);
    response.end();
  }
  
};

// These headers will allow Cross-Origin Resource Sharing (CORS)
const defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

module.exports = requestHandler;
