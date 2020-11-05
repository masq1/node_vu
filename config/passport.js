const passport=require('passport')
const mongoose=require('mongoose')
const user=mongoose.model('User')
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
passport.use(new JwtStrategy(opts,(jwt_payload, done)=>{
    //done是回调函数
        user.findById({
            _id:jwt_payload.id
        })
        .then((user)=>{
            if(user){
                return done(null,user)
            }else{
                return done(null,null)
            }
        }).catch((err=>console.log(err)))
}))
