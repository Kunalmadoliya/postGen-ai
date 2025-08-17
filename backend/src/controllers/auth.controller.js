const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function registerUser(req, res) {
  const {username, password} = req.body;

  const isUserExist = await userModel.findOne({username});

  if (isUserExist) {
    return res.status(400).json({
      message: "Username Already Exist!!",
    });
  }

  const user = await userModel.create({
    username,
    password,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  return res.status(200).json({message: "User Created Successfully"});
}
async function loginUser(req, res) {}

module.exports = {
  registerUser,
  loginUser,
};
