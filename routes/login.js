const router=require('express').Router();
const User=require('../model/user');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const {loginValidation} =require('./logValidation');

router.post("/",async (req,res)=>{
    const {error}= loginValidation(req.body);
    if(error==undefined){
        const user=await User.findOne({email:req.body.email});
        if(!user) return res.send('no email found');
        const validPass=await bcrypt.compare(req.body.password,user.password);
        if(!validPass) return res.status(400).send('invalid password');

        const token=jwt.sign({_id:user._id},process.env.TOKENSECRET,{expiresIn:"1h"});
        console.log(token);
        res.header('auth_token',token).send(token);
    }
})
module.exports=router;