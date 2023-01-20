// 익스프레스 모듈 가져오기
const express = require('express')

// 새로운 익스프레스 앱 만들기
const app = express()

// 포트는 자유롭게
const port = 5000
const bodyParser = require('body-parser')

const config = require('./config/key');

const {User} = require('./models/User')

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=> console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

// 서버가 켜졌을 때 보여줄 메세지
app.get('/', (req, res) => res.send('Hello World 안녕하세요!! 새해 복 많이 받으세요!!!'))


app.post('/register', (req, res) => {
  
  
  // 회원가입 시 필요한 정보들을 client에서 가져와 database에 넣어주기
  const user = new User(req.body)


  // 정보들을 user 모델에 저장
  user.save((err, userInfo) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })

})



app.listen(port, () => console.log('Example app listening on port 5000!'))