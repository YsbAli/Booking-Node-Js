
/*

import express from "express";

import { deleteUser, getAllUsers, getUsers, updateUsers } from "../src/controllers/users.controller.js";

import { VerifyAdmin, VerifyToken, VerifyUser } from "../utils/VerifyToken.utils.js";

const router = express.Router()



//authentication cheching middleware

router.get("/checkauthentication", VerifyToken, (req, resp, next) => {
    resp.send("Hello User, You are logged in ")
})

// this is for user verify or user Authorization 
router.get("/checkUser/:id", VerifyUser, (req, resp, next) => {
    resp.send("Hello User, You are logged in and you can modify your accound!")
})



// this is for Admin verify or Admin Authorization 
router.get("/checkAdmin/:id", VerifyAdmin, (req, resp, next) => {
    resp.send("Hello Admin, You are logged in and you can Modify all accound!")
})



//update user ,,,if user verified or token matched with user then only  the user can update
router.patch("/:id", VerifyUser, updateUsers)


//delete user,, if user verified or token matched with user then only  the user can delete profile
router.delete("/:id", VerifyUser, deleteUser)

//get One,,,,,if user verified or token matched with user then only  the user can see profile
router.get("/:id", VerifyUser, getUsers)

//get all ,,,,anly admin can see all users list
router.get("/", VerifyAdmin, getAllUsers)




export default router;





*/



// Fresh Code .............






import express from "express";

import { deleteUser, getAllUsers, getUsers, updateUsers } from "../src/Controllers/users.controller.js";

import { VerifyAdmin, VerifyToken, VerifyUser } from "../utils/VerifyToken.utils.js";

const router = express.Router()


//authorization .....if user valid or not

router.patch("/:id", VerifyUser, updateUsers)

router.delete("/:id", VerifyUser, deleteUser)

router.get("/:id", VerifyUser, getUsers)

//authorization ,,,,if admin valid or not
router.get("/", VerifyAdmin, getAllUsers)




export default router;

