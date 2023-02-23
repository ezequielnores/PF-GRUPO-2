require("dotenv").config();
const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_NAME } = process.env;
const cloudinary = require('cloudinary').v2;



// Configuration 
cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

module.exports = {cloudinary}