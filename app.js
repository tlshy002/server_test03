// 서버의 개념? 은 간단함 => 요청하는걸 갖다주는 프로그램


const express = require('express');
const app = express();

app.get('/pet', function(req, res) {
    res.send('환영합니다 펫용품 쇼핑 페이지입니다.');

})
app.get('/beauty', function(req, res) {
    res.send('<script>alet("뷰티페이지 방문 환영합니다.");</script>');
})
// 홈으로 방문했으면 /index.html파일로 보내주셈
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})
app.get('/write', function(req, res) {
    res.sendFile(__dirname + '/write.html')
})




// (서버띄울 포트번호, 띄운후 실행할 코드)
// 8080으로 들어왔을때 서버 열림
// port? : 컴퓨터에는 외부와 네트워크 통신할 수 있는 통로가 있음
app.listen(4000, function() {
    // 8080port로 웹서버 열고 잘열리면 아래 코드 실행
    console.log('listening on 4000');
});

// ex) /pet/home으로 get요청하면 펫상품 보여줌