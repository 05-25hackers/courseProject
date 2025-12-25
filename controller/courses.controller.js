const { User } = require('../model/user.model.js')
const { Course } = require('../model/course.model.js')

const GET_COURSES = async (req, res) => {
  const data = await Course.find().populate("author").populate("category");
	if (!data)
		return res.json({
			message: 'Error',
		})

	return res.json({
		message: 'Success',
		data,
	})
}

const CREATE_COURSE = async (req, res) => {
  const { role } = req.user;
	if (role !== '/admin') {
		let reqBody = req.body.body
		reqBody = JSON.parse(reqBody)

		const { name, description, video_name, price, user, category } = reqBody
		const userId = req.user._id
		const newData = await Course.create({
			name,
			description,
			video_name,
			price,
			category,
			user: user,
			user: userId,
		})
		await User.findByIdAndUpdate(
			{ _id: userId },
			{ $push: { course: newData } },
		)
		return res.json({
			message: 'Success',
			data: newData,
		})
	}
}


const DELETE_COURSE = async (req, res) => {
  const { role, _id } = req.user;
  const { id } = req.params.id;

  const course = await Course.findById(id);

  if (!course) {
    return res.json({ message: "kurs topilmadi" });
  }

  if (role === "admin") {
    await Course.findByIdAndDelete(id);
    return res.json({ message: "Ochirildi" });
  }

  if (role === "teacher" && course.author == _id) {
    await Course.findByIdAndDelete(id);
    return res.json({ message: "Ochirildi" });
  }

  return res.json({
    message: "Sizga mumkin emas",
  });
};

const UPDATE_COURSE = async (req, res) => {
  const { role } = req.user;

  
  const { id } = req.params;
  
  const { title, category } = req.body;

  const course = await Course.findById(id);

  if (!course) {
    return res.json({ message: "Kurs topilmadi" });
  }

  if (role === "admin") {
    const updated = await Course.findByIdAndUpdate(
      id,
      { title, category },
      { new: true }
    );
    return res.json({ message: "Yangilandi", data: updated });
  }

  if (role === "teacher" && course.author == _id) {
    const updated = await Course.findByIdAndUpdate(
      id,
      { title, category },
      { new: true }
    );
    return res.json({ message: "yangilandi", data: updated });
  }

  res.json({ message: "Sizga mumkin emassssss" });
};

module.exports = {
	GET_COURSES,
	CREATE_COURSE,
	UPDATE_COURSE,
	DELETE_COURSE,
}
