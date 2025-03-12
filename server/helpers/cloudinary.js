// filepath: /c:/Users/SAURABH/Desktop/ecommerce/server/helpers/cloudinary.js
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
  cloud_name: 'dxojsxiwt',
  api_key: '486587562145179',
  api_secret: 'CG617xujmhsBrq3ojBbyQULPxxw'
});

const storage = new multer.memoryStorage();

async function ImageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: 'auto'
  });
  return result;
}

const upload = multer({ storage });

module.exports = { upload, ImageUploadUtil };