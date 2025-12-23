const { User } = require('../model/user.model.js')

const GET_COURSE = async(req, res) => {
    const course = await User.find()
    if(!course) return res.json({
        message: "User not found"
    })

    return res.json({
        message: "Success",
        course
    })
}

