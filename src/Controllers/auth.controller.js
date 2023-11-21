
/*

import User from "../models/user.model.js"

import bcrypt from 'bcryptjs'
import { createError } from "../../utils/error.js"

const Register = async (req, resp, next) => {

    // try {
    // const newUser = await User.create({
    //     username: req.body.username,
    //     email: req.body.email,
    //     password: req.body.password
    // })

    // Hashing password with bcrypt
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt)

    try {
        // const newUser = new User({
        //     username: req.body.username,
        //     email: req.body.email,
        //     // password: req.body.password
        //     password: hash
        // })
        // await newUser.save()

        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })

        return resp.status(201).send({ Message: "User Created Successfully", newUser })
    }
    catch (err) {
        next(err)
    }
}





const Login = async (req, resp, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return next(createError(404, "User Not Found!"))

        const checkPassword = await bcrypt.compare(req.body.password, user.password)
        if (!checkPassword) return next(createError(400, "Wrong email or password!"))

        const token = JWT.sign({ id: user._id, isAdmin: user.isAdmin }, JWT_KEY)



        // const passtoken = cookie("access_token", token, {
        //     httpOnly: true                                               //httpOnly  --> it does not allow any client secret key reach this cookie 
        // })

        // Now setting this token into cookie ,,,,for that install cookie-perser


        // but we have to hide the password and isAdmin feild,,,so that

        // const { password, isAdmin, ...otherDetails } = user           // but this or user is a whole object ,,, and user details in present only inside  " _doc "" ,, that's why we have to pass the _doc also

        const { password, isAdmin, ...otherDetails } = user._doc           // now this will give me the otherdetails without password or isAdmin field

        //passing cookie with token.....access_token is the key name we can write any name here
        return resp.cookie("access_token", token, { httpOnly: true }).status(200).send({ Message: "Successfully Logged in", ...otherDetails })

    }
    catch (err) {
        next(err)
    }
}













*/




// Fresh Code 


import User from "../models/user.model.js"

import bcrypt from 'bcryptjs'
import { createError } from "../../utils/error.js"

import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'

const JWT_KEY = process.env.JWT_SECTER_KEY


const Register = async (req, resp, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt)

    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            // password: req.body.password
            password: hash
        })

        return resp.status(201).send({ Message: "User Created Successfully", newUser })
    }
    catch (err) {
        next(err)
    }
}


const Login = async (req, resp, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return next(createError(404, "User Not Found!"))

        const checkPassword = await bcrypt.compare(req.body.password, user.password)
        if (!checkPassword) return next(createError(400, "Wrong email or password!"))

        const token = JWT.sign({ id: user._id, isAdmin: user.isAdmin }, JWT_KEY)

        const { password, isAdmin, role, ...otherDetails } = user._doc           //   userDetails present inside _doc

        //passing cookie with token.....access_token is the key name we can write any name here
        return resp.cookie("access_token", token, { httpOnly: true }).status(200).send({ Message: "Successfully Logged in", details: { ...otherDetails }, isAdmin, role })

    }
    catch (err) {
        next(err)
    }
}



export { Register, Login }