// 서버의 개념? 은 간단함 => 요청하는걸 갖다주는 프로그램
const express = require('express');
const app = express();
// 몽고DB연결 세팅
const { MongoClient, ObjectId } = require('mongodb')
const methodOverride = require('method-override')
const cors = require("cors");


app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors());




let db;
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
    console.log("list페이지입니다 : ", result[0].title)
    // res.send(result[0].title);

    res.render('list.ejs', { 글목록 : result });
} )

app.get('/time', (req, res) => {
    let serverTime = new Date();
    console.log(serverTime)
    res.render('time.ejs', { data : serverTime })
})

app.get('/write', (req, res) => {
    res.render('write.ejs')
})



app.post('/writing', async (req, res) => {
    try {
        if (req.body.title == '') {
            res.send("입력란에 입력해주세요");
            } else {
                await db.collection('post').insertOne({
                    title: req.body.title, content: req.body.content 
                })
                console.log(req.body)
                return res.redirect('/');
            }
    } catch(e) {
        console.log(e)
        res.status(500).send('서버에러')
    }
})


app.get('/detail/:id', async (req, res) => {
    try {
        let result = await db.collection('post').findOne({ _id: new ObjectId(req.params.id) });
        console.log("URL파라미터값은 = " + req.params.id);
        console.log(result)
        res.render('detail.ejs', { detail : result } );
    } catch(e) {
        console.log(e)
        res.status(404).send('url 잘못입력햇스요')
    }
})


app.get('/edit/:id', async(req, res) => {
    try {
        db.collection('post').updateOne(
            { _id : new ObjectId('661c843796c14ae8c2b7aa1e') },
            {$set : { title : 'hello' } }
        )
        let result = await db.collection('post').findOne({ _id : new ObjectId(req.params.id)})
        console.log('say hi!!!')
        console.log(result);
        res.render('edit.ejs', { editContent : result });
    } catch(e) {
        // console.log(e);
        res.status(404).send('url잘못입력함')
    }   
})

app.put('/edit', async (req, res) => {
    await db.collection('post').updateOne({_id : 1}, 
        {$inc : { like : -2 } }
    )



    try {
        if(req.body.title == 0 || req.body.content == 0) {
            res.send("빈칸 안돼요")
        } else {
            await db.collection('post').updateOne({ _id : new ObjectId(req.body.id) }, 
                {$set : { title : req.body.title, content : req.body.content }}
            )
            console.log(req.body.title)
            console.log(req.body.content)
            return res.redirect('/list')
        }
    } catch(e) {
        console("뭔가잘못됨")
    }
})

// app.get('/detail/:id', async (req, res) => {
//     console.log(req.params)
//     res.render('detail.ejs');
// })

app.post('/abc', async(req, res) => {
    console.log('안녕')
    console.log(req.body)
})

// app.get('/abc/:id', (req, res) => {
//     console.log(req.params)
// })

app.delete('/delete', async(req, res) => {
    console.log(req.query)
    console.log("삭제됨")
    await db.collection('post').deleteOne({ _id : new ObjectId(req.query.docid)})
    res.send('삭제완료')
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




