
import Hotel from '../models/hotel.model.js'

import Room from '../models/room.model.js'



const createRoom = async (req, resp, next) => {

    const hotelId = req.params.hotelid
    const newRoom = new Room(req.body)

    try {
        //creating and saving room
        const savedRoom = await newRoom.save()
        try {
            //updating Hetol model's room field with savedRoom's id or room's id
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } })
        }
        //catching error to updating or inserting rooms field of Hotel model from savedRooms _id
        catch (err) {
            next(err)
        }

        //returning the rooms here
        return resp.status(201).send({ Message: "Room has been created Successfully", savedRoom })

    }
    catch (err) {
        next(err)
    }

}


//Update or patch room
const updateRoom = async (req, resp, next) => {
    try {
        const UpdateRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return resp.status(200).send({ Message: "Room has been Updated", UpdateRoom })
    }
    catch (err) {
        next(err)
    }

}

// Update available room
const UpdateRoomAvailability = async (req, resp, next) => {
    try {
        await Room.updateOne({ "roomNumbers._id": req.params.id }, { $push: { "roomNumbers.$.unavailableDates": req.body.dates } }, { new: true })
        return resp.status(200).send({ Message: "Room Status has been Updated" })
    }
    catch (err) {
        next(err)
    }

}

//delete room  ---> for deleting room we have to pass the pass the hotelid also,,,,so we need to pass the room id and the hotel id also to delete the room

const deleteRoom = async (req, resp, next) => {

    const hotelId = req.params.hotelid

    try {
        const DeleteRoom = await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } })
        }
        catch (err) {
            next(err)
        }
        return resp.status(200).send({ Message: "Room Has been Deleted", DeleteRoom })
    }
    catch (err) {
        next(err)
    }

}

//getone room
const getRoom = async (req, resp, next) => {
    try {
        const OneRoom = await Room.findById(req.params.id).lean().exec()
        if (!OneRoom) return resp.status(404).send({ Message: "No Room Found!" })
        return resp.status(200).send(OneRoom)
    }
    catch (err) {
        next(err)
    }

}

//getAll room
const getAllRooms = async (req, resp, next) => {
    try {
        const AllRooms = await Room.find().lean().exec()
        if (AllRooms === 0) return resp.status(404).send({ Message: "No Room Found!" })
        return resp.status(200).send(AllRooms)
    }
    catch (err) {
        next(err)
    }

}



export { createRoom, updateRoom, deleteRoom, getRoom, getAllRooms, UpdateRoomAvailability }
