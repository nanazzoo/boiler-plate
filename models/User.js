const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type:String,
        // 빈칸을 없애줌
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        maxlength: 50
    },
    role: {
        type:Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }

})

// DB에 데이터를 저장하기 전에 실행하는 함수(비밀번호 암호화)
userSchema.pre('save', function( next ) {

    var user = this;

    // 비밀번호를 변경할 때에만
    if(user.isModified('password')) {

        // 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                
                // 비밀번호를 암호화된 비밀번호로 교체
                user.password = hash
                next()
            })
            
        })
    }

})


const User = mongoose.model('User', userSchema)

module.exports = {User}