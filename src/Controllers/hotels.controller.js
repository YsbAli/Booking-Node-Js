


/*

import express from "express";
import Hotel from '../models/hotel.model.js'
import { createError } from "../../utils/error.js";

const router = express.Router()


//Create or post method
router.post("/", async (req, resp) => {

    const newHotel = new Hotel(req.body)

    try {
        const saveHotel = await newHotel.save()
        return resp.status(200).send(saveHotel)
    }
    catch (err) {
        return resp.status(500).send("Error in Hotels Post Routes", { Message: err.Message })
    }
})

//Update Hotel
router.patch("/:id", async (req, resp) => {

    try {
        const UpdateHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return resp.status(200).send(UpdateHotel)

    } catch (err) {
        return resp.status(500).send("This Error in Hotels Update Routes", { Message: err.Message })
    }
})



//Delete Hotel
router.delete("/:id", async (req, resp) => {

    try {
        const DeleteHotel = await Hotel.findByIdAndDelete(req.params.id)
        return resp.status(200).send({ Message: "Hotel Has been Deleted" })

    } catch (err) {
        return resp.status(500).send("This Error in Hotels Delete Routes", { Message: err.Message })
    }
})


//getOne
router.get("/:id", async (req, resp) => {

    try {
        const FindHotel = await Hotel.findById(req.params.id).lean().exec()
        return resp.status(200).send(FindHotel)

    } catch (err) {
        return resp.status(500).send("This Error in Hotels GetOne Routes", { Message: err.Message })
    }
})



// Getall
router.get("/", async (req, resp, next) => {
    try {
        const AllHotels = await Hotel.find()
        return resp.status(200).send(AllHotels)
    } catch (err) {
        next(err)
    }
})





/*

//GetAll route,,, this is for error hanlding purpose or practice only

router.get("/", async (req, resp, next) => {


    const failed = true
    const err = new Error()
    err.status = 404;
    err.message = "Sorry not Found! ... this is custom error"
    if (failed) return next(err)


    try {
        const AllHotels = await Hotel.find()
        return resp.status(200).send(AllHotels)
    } catch (err) {
        next(err)
    }
})




// Now customize the error ,, build another error function and import that custom error function and show....

router.get("/", async (req, resp, next) => {

    const failed = true
    //calling the error message importing from utils/error.js file
    const error = createError(401, "You are not Authenticates")

    if (failed) return next(error)        //passing the error here

    try {
        const AllHotels = await Hotel.find()
        return resp.status(200).send(AllHotels)
    } catch (err) {
        next(err)
    }
})


*/




// export default router;










// getAll

// router.get("/", async (req, resp) => {

//     try {
//         const AllHotels = await Hotel.find().lean().exec()
//         return resp.status(200).send(AllHotels)

//     } catch (err) {
//         return resp.status(500).send("This Error in Hotels GetAll Routes", { Message: err.Message })
//     }
// })






//  This is for error handling


// router.get("/", async (req, resp, next) => {
//     // this is for handle error
//     // const failed = true
//     // if (failed) return next(createError(401, "You are not authenticated !"))
//     try {
//         const AllHotels = await Hotel.find()
//         return resp.status(200).send(AllHotels)

//     } catch (err) {
//         // return resp.status(500).send("This Error in Hotels GetAll Routes", { Message: err.Message })
//         next(err)
//     }
// })





// router.get("/", async (req, resp, next) => {
//     // this is for handle error
//     const failed = true
//     const err = new Error()
//     err.status = 404;
//     err.message = "Sorry not found!"
//     if (failed) return next(err)

//     try {
//         const AllHotels = await Hotel.find().lean().exec()
//         return resp.status(200).send(AllHotels)
//     } catch (err) {
//         next(err)
//     }
// })









//  NOW WE WILL CREATE OR SEPARATE OUR CONTROLLER FOLDER SO THAT WE CAN USE THIS IN THE ROUTE FOLDER


import Hotel from '../models/hotel.model.js'
import Room from '../models/room.model.js'


//create or Post
const createHotels = async (req, resp, next) => {
    const newHotel = new Hotel(req.body)
    try {
        const saveHotel = await newHotel.save()
        return resp.status(200).send({ Message: "Hotel has been Created", saveHotel })
    }
    catch (err) {
        next(err)
    }

}


//Update or patch
const updateHotels = async (req, resp, next) => {
    try {
        const UpdateHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return resp.status(200).send({ Message: "Hotel has been Updated", UpdateHotel })
    }
    catch (err) {
        next(err)
    }

}


const deleteHotels = async (req, resp, next) => {
    try {
        const DeleteHotel = await Hotel.findByIdAndDelete(req.params.id)
        return resp.status(200).send({ Message: "Hotel Has been Deleted", DeleteHotel })
    }
    catch (err) {
        next(err)
    }

}

const getHotels = async (req, resp, next) => {
    try {
        const AllHotels = await Hotel.findById(req.params.id).lean().exec()
        if (!AllHotels) return resp.status(404).send({ Message: "No Hotel Found!" })
        return resp.status(200).send(AllHotels)
    }
    catch (err) {
        next(err)
    }

}


const getAllHotels = async (req, resp, next) => {
    const { min, max, ...others } = req.query;

    try {
        const AllHotels = await Hotel.find({ ...others, cheapestPrice: { $gt: min || 1, $lt: max || 1000000 } }).limit().lean().exec()
        // console.log(AllHotels)
        if (AllHotels === 0) return resp.status(404).send({ Message: "No Hotel Found!" })
        return resp.status(200).send(AllHotels)
    }
    catch (err) {
        next(err)
    }

}



/*

//Count Cities hotels  ,,,,Count how many hotels is a perticular city

const CityHotels = async (req, resp, next) => {

    //http://localhost:8080/api/hotels/CityHotels?cities=Cob, Kol, Bangaluru
    const cities = req.query.cities.split(",")          // cities will be in array  and split with (,) like ---> [Cob, Kol, Bangaluru]


    try {
        const sortedData = await Promise.all((cities.map(city => {                     // trying to find multiple items like multiple cities ,,, that's why ----> Promise.all
            return Hotel.countDocuments({ city: city })                  // it will find all the documentw with that city
        })))

        return resp.status(200).send(sortedData)

    }
    catch (err) {
        next(err)
    }

}


*/


const CityHotels = async (req, resp, next) => {

    const cities = req.query.cities.split(",")                               // http://localhost:8080/api/hotels/CityHotels?cities=Cob, Kol, Bangaluru 
    // console.log(cities)
    try {
        const resultData = await Promise.all((cities.map(city => {
            // return Hotel.find({ city: city }).length
            return Hotel.countDocuments({ city: city })

        })))

        // console.log(sortedData)
        return resp.status(200).send(resultData)

    }
    catch (err) {
        next(err)
    }

}


//Count Type Hotels or count by type..... count how many hotel in that perticuler type

const CountByType = async (req, resp, next) => {
    try {
        const CountHotel = await Hotel.countDocuments({ type: "Hotel" })
        const CountApertment = await Hotel.countDocuments({ type: "Apartment" })
        const CountResorts = await Hotel.countDocuments({ type: "Resorts" })
        const CountVilla = await Hotel.countDocuments({ type: "Villa" })
        const CountGH = await Hotel.countDocuments({ type: "GuestHouse" })

        const CountAll = [
            { type: "Hotel", count: CountHotel },
            { type: "Apartment", count: CountApertment },
            { type: "Resorts", count: CountResorts },
            { type: "Villa", count: CountVilla },
            { type: "GuestHouse", count: CountGH },
        ]

        // return resp.status(200).send("Result Data", [
        //     { type: "Hotel", count: CountHotel },
        //     { type: "Apartment", count: CountApertment },
        //     { type: "Resorts", count: CountResorts },
        //     { type: "Villa", count: CountVilla },
        //     { type: "GuestHouse", count: CountGH },
        // ])
        resp.status(200).send(CountAll)
    }
    catch (err) {
        next(err)
    }
}



const GetHotelRooms = async (req, resp, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const roomList = await Promise.all(hotel.rooms.map((room) => {
            return Room.findById(room)
        })
        )
        resp.status(200).send(roomList)
    }
    catch (err) {
        next(err)
    }

}



export { createHotels, updateHotels, deleteHotels, getHotels, getAllHotels, CityHotels, CountByType, GetHotelRooms }
