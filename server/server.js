const express = require("express")
const app = express()
const port = 3000
const route = require("./routes/route")


app.use(express.json())
app.use("/api",route)


app.listen("port",()=>{
    console.log(`server is running on the port ${port}`)
})

