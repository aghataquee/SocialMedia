const express=require('express');
const cookieparser=require('cookie-parser');
const app=express();
const user=require('./Routes/user')
require('dotenv').config({path:"BackEnd/config/config.env"});
const dbConnection=require('./config/dbConnect');
dbConnection();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());   
app.use('/',user);
module.exports=app;