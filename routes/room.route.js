
import express from "express";
import { VerifyAdmin, VerifyUser } from "../utils/VerifyToken.utils.js";
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom, UpdateRoomAvailability } from "../src/controllers/rooms.controller.js";
const router = express.Router()

router.post("/:hotelid", VerifyAdmin, createRoom)

router.patch("/:id", VerifyAdmin, updateRoom)
router.patch("/availability/:id", UpdateRoomAvailability)

//for deleting the room, we need room id and the hotel is also
router.delete("/:id/:hotelid", VerifyAdmin, deleteRoom)

router.get("/:id", getRoom)

router.get("/", getAllRooms)



export default router;
