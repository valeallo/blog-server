const express = require("express")
const mongoose = require("mongoose")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
require("dotenv").config()

const cors = require("cors")
const PORT = process.env.PORT || 3030

const app = express()
app.use(cors()) //posso specificare quali indirizzi voglio così : {origin: "url"}
app.use(express.json()) //body parser(???)
app.use("/", userRoute)
app.use("/", postRoute)


mongoose.connect(process.env.DB_ADDRESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection
db.on("error", () => {
    console.error.bind(console, "errore di connessione")
})
db.once("open", ()=>{
    console.log("database connected")
})
app.listen(PORT, ()=> console.log(`server running correctly on PORT ${PORT}`))