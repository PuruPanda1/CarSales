import express from "express"

import {userRouter} from "./routers/users.js"
import {carRouter} from "./routers/car.js"

const app = express()

app.use(express.json())

app.use("/users", userRouter)

app.use('/cars', carRouter)

app.get("/info", (req, res)=>{
    res.json({"users": ["Shilla","Chameli","Champa"]})
})

app.get('/', async(req, res) => {
    res.send("hi")
})

app.get('/error', (req, res) => {
    res.status(500).json({message: "Error"})
})

app.get('/download', (req, res) => {
    res.download("server.js")
})

app.get('/info', (req, res)=>{
    if (req == 0) {
        res.send('0 it is')
    }else{
        res.send('1 it is')
    }
})



app.listen(5000, () => {console.log("Server started in Port 5000")})