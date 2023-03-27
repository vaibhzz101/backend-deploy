const router = express.Router();
const client = require('../cache')
const session = require("express-session")
const rateLimit = require('express-rate-limit')

router.post('/login', (req,res)=>{


    req.session.loggedIn = true;
    res.redirect('/');
});

router.get('/logout', (req,res)=>{
    client.set(`blacklist:${req.sessionID}`, true, 'EX', 60*60*24);
    req.session.destroy();
    res.redirect('/login')
});

router.use((req,res,next) => {
    if(req.session.loggedIn & !client.get(`blacklist:${req.sessionID}`)){
        next();

    }
    else{
        res.redirect('/login')
    }
});
function validateCity(req,res,next){
    const city = req.params.city;
    if(typeof city !== 'string' || /[a-zA-Z]+$/.test(city)){
        return res.sendStatus(400);
    }
    next()
}
const logInvalidCity = (req,res,next)=>{
    const city = re.params.city;
    if(/[a-zA-Z]/.test(city)){

    }
    next()
}

const limiter = rateLimit({
    windowsMs:4*60*1000, 
    max:1,
    keyGenerator:(req) =>{
        return req.ip
    },
    handler:( req,res)=>{
        res.sendStatus(429)
    }
})

module.exports = {authentication, limiter, logInvalidCity };