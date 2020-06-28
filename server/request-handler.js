/*************************************************************

request handler 함수를 여기서 작성합니다.

reuqestHandler 함수는 이미 basic-server.js 파일에서 사용 했지만, 아직 작동하지 않습니다.

requestHandler 함수를 export 하여 basic-server.js 에서 사용 할 수 있게 하세요

**************************************************************/
let message = [];
//한글로 데이터 입력할때, 데이터 깨지고 업데이트도 느려짐
const requestHandler = function(request, response) {
  request.setEncoding('utf-8')
  // 기본 CORS 설정이 되어있는 코드 입니다. 아래에 있습니다.
  // CORS에 대해서는 조금더 알아보세요.
  let headers = defaultCorsHeaders;
  // 응답 헤더에 응답하는 컨텐츠의 자료 타입을 헤더에 기록 합니다.
  headers["Content-Type"] = "text/plain";
  // 노드 서버에 대한 모든 요청은 응답이 있어야 합니다. response.end 메소드는 요청에 대한 응답을 보내줍니다.
  request.on('data', (chunk) => {
    message.push(JSON.parse(chunk));
  })
  //console.log(message);
  if(request.method === 'POST'){
    request.on('end', () => {
      response.writeHead(200, headers); 
      response.end(JSON.stringify(message));
    })
  }
  else if(request.method === 'OPTIONS'){
    response.writeHead(200, headers);
    response.end();
  }
  else if(request.method === 'GET'){
    response.writeHead(200, headers);
    response.end(JSON.stringify(message));
    //console.log(JSON.stringify(message))
  }
  else{
    response.writeHead(404, headers);
    response.end("method error");
  }
};

const defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

module.exports = requestHandler;
  /*
  request.on('end', () => {
    if (request.method === "POST") {
      console.log('post')
      response.writeHead(200, headers)
      response.end(JSON.stringify(message));
    } else if (request.method === "GET") {
      response.writeHead(200, headers);
      response.end(JSON.stringify(message));
      console.log(JSON.stringify(message))
    } else {
      response.writeHead(404, headers);
      response.end("잘못된 요청입니다.");
    }
    if (request.method === "OPTIONS") {
      console.log("option")
      response.writeHead(200, headers)
      response.end();
      console.log('넘어가지나?')
    }
  })
  */
  //console.log(
  //  `http request method is ${request.method}, url is ${request.url}`
  //);

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
