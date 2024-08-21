const mongoose=require('mongoose');
const dbConnect=()=>{
    mongoose
    .connect(process.env.MONGO_URI)
    .then((conn)=>console.log(`The database is connected to ${conn.connection.host}`))
    .catch((err)=>console.log(err))
}
module.exports=dbConnect;