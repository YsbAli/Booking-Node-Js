import mongoose from 'mongoose'

const RoomSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    maxPeople: { type: Number, required: true },
    description: { type: String, required: true },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],                           // two people can't book same room in save date
    photos: { type: [String] },

},
    {
        versionKey: false,
        timestamps: true

    }
)

const Room = mongoose.model("Room", RoomSchema)

export default Room;







/*

roomNumbers will be like this : ----> 

roomNumbers : [

    {number : 112, unavailableDates : [01.05.2023, 02, 05, 2023]}
    {number : 113, unavailableDates : [01.05.2023, 02, 05, 2023]}
    {number : 114, unavailableDates : [01.05.2023, 02, 05, 2023]}
    {number : 115, unavailableDates : [01.05.2023, 02, 05, 2023]}
    {number : 116, unavailableDates : [01.05.2023, 02, 05, 2023]}
    {number : 117, unavailableDates : [01.05.2023, 02, 05, 2023]}
    {number : 118, unavailableDates : [01.05.2023, 02, 05, 2023]}

]

*/
