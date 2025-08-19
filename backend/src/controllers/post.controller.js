const postModel = require("../models/post.model");
const generateCaption = require("../services/ai.services");

async function createPostController(req, res) {
  const file = req.file;


  const base64ImageData = new Buffer.from(file.buffer).toString('base64');

  const caption = await generateCaption(base64ImageData)
  console.log(caption);
  
}

module.exports = createPostController;
