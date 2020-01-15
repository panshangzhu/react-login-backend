const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const registerPage=require('./routes/register');
const loginPage=require('./routes/login');
const verify=require('./routes/tokenCheck');
const cors=require('cors');


const app=express();
dotenv.config();
app.use(cors());
const port=process.env.PORT | 5000
app.use(express.json());
mongoose.connect(
    process.env.DB_CONNECT,
    {  useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true } ,
    () => console.log("connected to DB")
  );

  
  app.get("/",(req,res)=>{
      res.json({post:'hello world'});
 })
 app.use("/verify",verify);
 app.use("/register",registerPage);
 app.use("/login",loginPage);

app.listen(port,()=>console.log(`server is running in ${port}`));