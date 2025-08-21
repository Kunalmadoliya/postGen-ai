const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");

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
    password: await bcrypt.hash(password, 10),
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

async function loginUser(req, res) {
  const {username, password} = req.body;

  const user = await userModel.findOne({username});

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const verifiedPasswod = await bcrypt.compare(password , user.password)

  if (!verifiedPasswod) {
    return res.status(400).json({message: "Invalid Password"});
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );
  res.cookie("token", token);

  return res.status(200).json({
    message: "User Loggedin  Successfully",
    user: {username: user.username, id: user._id },
  });
}

module.exports = {
  registerUser,
  loginUser,
};
