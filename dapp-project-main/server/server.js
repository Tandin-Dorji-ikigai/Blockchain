const app = require('./app')
const dotenv = require('dotenv')
const { default: mongoose } = require("mongoose")
dotenv.config({path:'./config.env'})

mongoose.set('strictQuery', false);

const DB = process.env.DB.replace(
    "PASSWORD",
    process.env.DATABASE_PASSWORD,
)

// const local_DB = process.env.DATABASE_LOCAL

// mongoose.connect(local_DB).then((con) =>{
//     console.log(con.connections)
//     console.log("DB Connection successful")
// }).catch(error => console.log(error))

mongoose.connect(DB).then((con) =>{
    // console.log(con.connections)
    console.log("DB CONNECTION SUCCESSFUL")
}).catch(error => console.log(error))

const port = 4002
app.listen(port, () =>{ 
    console.log(`App running on port ${port}`)
})

