const express=require('express');
const mongoose=require('mongoose');
const helloRouter=require('./Routes/hello');
const registerRouter=require('./Routes/authentification');
const infosRouter=require('./Routes/infos');
require('dotenv').config();

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api",helloRouter);
app.use("/auth",registerRouter);
app.use("/infos",infosRouter);


mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>console.log("connected to DB"), err => {
    console.log(err) })

app.listen(5000,()=>
{
    console.log("server is running !!");

});