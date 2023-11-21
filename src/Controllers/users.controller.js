
import User from '../models/user.model.js'


//Update or patch
const updateUsers = async (req, resp, next) => {
    try {
        const UpdateUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return resp.status(200).send({ Message: "User Successfully Updated!", UpdateUser })
    }
    catch (err) {
        next(err)
    }

}


//detele user
const deleteUser = async (req, resp, next) => {
    try {
        const DeleteUser = await User.findByIdAndDelete(req.params.id)
        return resp.status(200).send({ Message: "User Has been Deleted", DeleteUser })
    }
    catch (err) {
        next(err)
    }

}



//getOne user
const getUsers = async (req, resp, next) => {
    try {
        const OneUser = await User.findById(req.params.id).lean().exec()
        if (!OneUser) return resp.status(404).send({ Message: "No User Found!" })
        return resp.status(200).send(OneUser)
    }
    catch (err) {
        next(err)
    }

}

//getAll user
const getAllUsers = async (req, resp, next) => {
    try {
        const AllUsers = await User.find().lean().exec()
        if (AllUsers === 0) return resp.status(404).send({ Message: "No User Found!" })
        return resp.status(200).send(AllUsers)
    }
    catch (err) {
        next(err)
    }

}



export { updateUsers, deleteUser, getUsers, getAllUsers }

