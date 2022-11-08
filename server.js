const express = require("express")
const mongoose = require("mongoose")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")

const cors = require("cors")
const PORT = 3030

const app = express()
app.use(cors())
app.use(express.json())
app.use("/", userRoute)
app.use("/", postRoute)


mongoose.connect("mongodb+srv://vale:mongoDB1234@blogdb.1ikwt15.mongodb.net/blogDB?retryWrites=true&w=majority")
const db = mongoose.connection
db.on("error", () => {
    console.error.bind(console, "errore di connessione")
})
db.once("open", ()=>{
    console.log("database connected")
})
app.listen(PORT, ()=> console.log(`server running correctly on PORT ${PORT}`))