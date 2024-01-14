// 서버의 개념? 은 간단함 => 요청하는걸 갖다주는 프로그램


const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'))

// 몽고DB연결 세팅
const { MongoClient } = require('mongodb')
let db
const url = 'mongodb+srv://user:hi30081227@cluster0.lyh4mwk.mongodb.net/?retryWrites=true&w=majority'
new MongoClient(url).connect().then((client)=>{ // 몽고DB에 접속해줌
  console.log('DB연결성공')
  db = client.db('forum') // 연결시킬 'DB이름'에 연결
//   app.listen(4000, () => {
//     console.log("http://localhost:4000에서 서버 실행중");
//   })
}).catch((err)=>{
  console.log(err)
})


app.get('/pet', function(req, res) {
    db.collection('post').insertOne( {title: 'a'})
    res.send('환영합니다 펫용품 쇼핑 페이지입니다.');

})
app.get('/beauty', function(req, res) {
    res.send('<script>alet("뷰티페이지 방문 환영합니다.");</script>');
})
// 홈으로 방문했으면 /index.html파일로 보내주셈
app.get('/', function(req, res) {
    //__dirname뜻: 현재 프로젝트 폴더의 절대경로를 알려줌(app.js담긴 폴더위치)
    res.sendFile(__dirname + '/html/index.html') 
})
app.get('/write', function(req, res) {
    res.sendFile(__dirname + '/html/write.html')
})
app.get('/about', function(req, res) {
    res.sendFile(__dirname + '/html/about.html')
})




// (서버띄울 포트번호, 띄운후 실행할 코드)
// 8080으로 들어왔을때 서버 열림
// port? : 컴퓨터에는 외부와 네트워크 통신할 수 있는 통로가 있음
app.listen(4000, function() {
    // 8080port로 웹서버 열고 잘열리면 아래 코드 실행
    console.log('Server is running http://localhost:4000');
});
// ex) /pet/home으로 get요청하면 펫상품 보여줌