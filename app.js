// 서버의 개념? 은 간단함 => 요청하는걸 갖다주는 프로그램
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')

// 몽고DB연결 세팅
const { MongoClient } = require('mongodb')
let db
const url = 'mongodb+srv://admin:qwer1234@cluster0.lyh4mwk.mongodb.net/?retryWrites=true&w=majority'
new MongoClient(url).connect().then((client)=>{ // 몽고DB에 접속해줌
  console.log('DB연결성공')
  db = client.db('forum') // 'DB이름'에 데이터베이스 연결
    app.listen(4000, function() {
        console.log('Server is running http://localhost:4000');
    });
}).catch((err)=>{
  console.log(err)
})

app.get('/list', async (req, res) => {
    let result = await db.collection('post').find().toArray()
    console.log(result[0].title)
    // res.send(result[0].title);

    res.render('list.ejs', { 글목록 : result });
} )

app.get('/time', (req, res) => {
    let serverTime = new Date();
    console.log(serverTime)
    res.render('time.ejs', { data : serverTime })
})






app.get('/pet', function(req, res) {
    db.collection('post').insertOne( {title: 'b'})
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




