

/*

import JWT from 'jsonwebtoken'
import { createError } from './error.js'

import dotenv from 'dotenv'

dotenv.config()


const VerifyToken = (req, resp, next) => {

    const token = req.cookies.access_token                    //we have stored the token inside cookies , named as access_token

    if (!token) return next(createError(401, "You are not Authenticated!"))

    //verifying the token
    JWT.verify(token, process.env.JWT_SECTER_KEY, (err, userinfo) => {                                // userinfo --- > { id: user._id, isAdmin: user.isAdmin }  ,which is written in token generation time or auth file
        if (err) return next(createError(403, "Invalid Token!"))

        // if there is no error then send the req,,,, req.user ---> here user can be anything,,,we can write hello asdlkfslda also

        // req.userdetails = userinfo         //besically assigning new property here
        req.user = userinfo         //besically assigning new property here
        next()                  // if everything ok! run the next operation or next middleware or  next code
    })
}



//verify user ,,authorized  user or not  ... first verify token then verify owner user or admin 
const VerifyUser = (req, resp, next) => {
    VerifyToken(req, resp,next, () => {

        //this is user info.... only user & admin can modify or delete user info or user details
        // if (req.userdetails.id === req.params.id || req.userdetails.isAdmin) {

        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        }
        else {
            return next(createError(403, "You are not authorized!"))
        }
    })
}



//verify Admin ,,authorized  Admin or not

const VerifyAdmin = (req, resp, next) => {
    VerifyToken(req, resp, next,() => {

        //this is user info.... only user & admin can modify or delete user info or user details
        // if (req.userdetails.id === req.params.id || req.userdetails.isAdmin) {

        if (req.user.isAdmin) {
            next()
        }
        else {
            return next(createError(403, "You are not authorized!"))
        }
    })
}



export { VerifyToken, VerifyUser, VerifyAdmin };




*/




// Fresh Code For Verify Token , User And Admin



import JWT from 'jsonwebtoken'
import { createError } from './error.js'

import dotenv from 'dotenv'

dotenv.config()


const VerifyToken = (req, resp, next) => {

    const token = req.cookies.access_token                    //we have stored the token inside cookies , named as access_token

    if (!token) return next(createError(401, "You are not Authenticated!"))

    //verifying the token
    JWT.verify(token, process.env.JWT_SECTER_KEY, (err, userinfo) => {                                // userinfo --- > { id: user._id, isAdmin: user.isAdmin }  ,which is written in token generation time or auth file
        if (err) return next(createError(403, "Invalid Token!"))

        // req.userdetails = userinfo        
        req.user = userinfo
        next()
    })
}



//verify user ,,authorized  user or not  ... first verify token then verify owner user or admin 
const VerifyUser = (req, resp, next) => {
    VerifyToken(req, resp, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        }
        else {
            return next(createError(403, "You are not authorized!"))
        }
    })
}



//verify Admin ,,authorized  Admin or not

const VerifyAdmin = (req, resp, next) => {
    VerifyToken(req, resp, next, () => {
        if (req.user.isAdmin) {
            next()
        }
        else {
            return next(createError(403, "You are not authorized!"))
        }
    })
}



export { VerifyToken, VerifyUser, VerifyAdmin };

