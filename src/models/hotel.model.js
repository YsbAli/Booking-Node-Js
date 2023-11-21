import mongoose from 'mongoose'

const HotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },                  // this is besically type of the property like hotels, apartment, guest house etc    
    city: { type: String, required: true },
    address: { type: String, required: true },
    distance: { type: String, required: true },
    photos: { type: [String] },                                //photos will be multiple that's why in array
    title: { type: String, required: true },                                //photos will be multiple that's why in array
    desc: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5 },
    rooms: { type: [String] },                              // room id 
    cheapestPrice: { type: Number, required: true },
    featured: { type: Boolean, required: false },
},
    {
        versionKey: false,
        timestamps: true

    }
)

const Hotel = mongoose.model("Hotel", HotelSchema)

export default Hotel;