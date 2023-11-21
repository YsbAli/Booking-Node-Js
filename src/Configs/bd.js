
// const mongoose = require("mongoose")

// require("dotenv").config()

import mongoose from 'mongoose'
import dontenv from 'dotenv'
dontenv.config()

const MONGOURL = process.env.MONGOURL


const ConnectDB = async () => {

    try {
        const connect = await mongoose.connect(MONGOURL)
        return connect
    }
    catch (err) {
        console.log("Error in DB Connection", { Message: err.Message })
    }
}


export default ConnectDB;