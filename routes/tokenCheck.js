const jwt=require('jsonwebtoken');
const router = require("express").Router();

router.post('/',(req,res)=>{
const token=req.body.jwt;
console.log(token);
if(!token) return res.status(400).send('access denied');
try{
    const checked=jwt.verify(token,process.env.TOKENSECRET);
    console.log('jw', checked);
    res.send(checked);
}catch(err){
    console.log('err', err)
    res.status(400).send('invalid token');
}
})

module.exports=router;