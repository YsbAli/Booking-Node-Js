import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'

import cookieParser from 'cookie-parser'

import ConnectDB from './src/Configs/bd.js'

//routes
import HotelRoute from './routes/hotel.route.js'
import AuthRoute from './routes/auth.route.js'
import UserRoute from './routes/user.route.js'
import RoomRouter from './routes/room.route.js'



const app = express()
const PORT = process.env.PORT || 8080

// app.use(cors())
app.use(cors({
    origin: [""],
    methods: ["POST", "GET"],
    credentials: true
}))

app.use(express.json())


//cookie 

app.use(cookieParser())



//api endpoints
app.use("/api/hotels", HotelRoute)
app.use("/api/auth", AuthRoute)
app.use("/api/users", UserRoute)
app.use("/api/rooms", RoomRouter)


app.get("/", (req, resp) => {
    return resp.send("Hello Home Page!, The route are :--> api/hotels api/rooms --> to see the main api use the route /api/hotels or booking-api.yousub.live/api/hotels")
})


app.get("/user", (req, resp) => {
    return resp.send("Hello User Page")
})


//error handling middleware
app.use((err, req, resp, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return resp.status(errorStatus).send({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})



app.listen(PORT, () => {
    ConnectDB()
    console.log(`Connected to Server & running on Port ${PORT}`)
})
