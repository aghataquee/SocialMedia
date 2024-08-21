const app=require('./app');

app.listen(process.env.PORT,()=>{
    console.log(`The server is running at ${process.env.PORT}`)
})