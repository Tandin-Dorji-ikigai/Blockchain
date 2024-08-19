const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path:'config.env'})
const app = require('./app.js')

const DB =process.env.DATABASE.replace(
    "PASSWORD",
    process.env.DATABASE_PASSWORD,

) 
// const DB = "mongodb+srv://devgoobuu:97DdbPQVYZr0PwCh@cluster0.fcaghtx.mongodb.net/?retryWrites=true&w=majority"
// mongoose.connect(DB).then((con)=>{
//     // console.log(con.connection)
//     console.log('DB connection successful')
// }).catch(error=>console.log(error))
mongoose.connect(process.env.DATABASE_LOCAL).then((con)=>{
    // console.log(con.connection)
    console.log('DB connection successful')
}).catch(error=>console.log(error))

const port = 4001
app.listen(port,()=>{
    console.log(`App running on port ${port}..`)
})
