const {User} = require('../model/users.model.js')
const {Course} = require('../model/course.model.js')

const GET_COURSES = async (req, res) => {
    const data = await User.find()
    if(!data) return res.json({
        message: "Error"
    })

    return res.json({
        message: "Success",
        data
    })
}

const CREATE_COURSE = async (req, res) => {
    if(role === "/admin"){
        let reqBody = req.body.body
    reqBody = JSON.parse(reqBody)


    const { name, description, video_name, price, user, category } = reqBody;
    const userId = req.user._id;
    const newData = await Course.create({
        name,
        description,
        video_name,
        price,
        category,
        user: user,
        user: userId,
    });
    await User.findByIdAndUpdate({ _id: userId }, { $push: { course: newData } });
    return res.json({
        message: "Success",
        data: newData,
    });
    }
}

const UPDATE_COURSE = async (req, res) => {
    if(role === "/admin"){
    const { id } = req.params;
  const { name, video_name, price, category } = req.body;
  const data = await Post.findByIdAndUpdate(id, { name, video_name, price, category }, { new: true });
  res.json({
    message: "Yangilandi",
    data: data,
  });
    }
}

const DELETE_COURSE = async (req, res) => {
  if(role === "/admin"){
    const { id } = req.params;
  await Course.findByIdAndDelete(id);
  await User.findByIdAndUpdate(req.user._id, { $pull: { posts: id } });
  res.json({
    message: "O'chirildi",
  });
  }
};

module.exports = {
    GET_COURSES,
    CREATE_COURSE,
    UPDATE_COURSE,
    DELETE_COURSE
}