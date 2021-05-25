const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const authJwt = require('./helpers/jwt')
require('dotenv').config()
const { readdirSync } = require('fs')


//app
const app = express()
//db
const connection_url = process.env.ATLAS_URI;
mongoose.connect(connection_url,{
    useCreateIndex:true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.once("open",() => {
    console.log("dbconected");
})

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({limit: "2mb"}));
app.use(cors())
app.use(authJwt())
//routes middlewares


// app.use('/api',authRoutes)
// app.use('/api',categoryRoutes)
readdirSync("./routes").map((r) => app.use("/api",require("./routes/" + r)));
//listen
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});