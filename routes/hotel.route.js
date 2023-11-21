
import express from 'express'

const router = express.Router()

import { createHotels, updateHotels, deleteHotels, getHotels, getAllHotels, CityHotels, CountByType, GetHotelRooms } from "../src/controllers/hotels.controller.js"

import { VerifyAdmin, VerifyUser, } from '../utils/VerifyToken.utils.js'


//Post or Create
router.post("/", VerifyAdmin, createHotels)


//update or Patch
router.patch("/:id", VerifyAdmin, updateHotels)

//delete
router.delete("/:id", VerifyAdmin, deleteHotels)


//Get one
router.get("/find/:id", getHotels)


// GetAll
router.get("/", getAllHotels)


//  Getting hotels with City and type


router.get("/ByCity", CityHotels)
router.get("/ByType", CountByType)
router.get("/rooms/:id", GetHotelRooms)



export default router