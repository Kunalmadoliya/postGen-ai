const generateCaption = require("../services/ai.services");
const uploadFile = require("../services/storage.service");
const postModel = require("../models/post.model");
const {v4: uuidv4} = require("uuid");

async function createPostController(req, res) {
  const file = req.file;
  
  const base64ImageData = new Buffer.from(file.buffer).toString("base64");

  const caption = await generateCaption(base64ImageData);
  const result = await uploadFile(file.buffer, `${uuidv4()}`);

  const post = await postModel.create({
    caption: caption,
    image: result.url,
    user: req.user._id,
  });

  return res.status(201).json({
    message:'Post created Succesfully',
    post
  })
}

module.exports = createPostController;
