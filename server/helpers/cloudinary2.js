const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Image upload utility function
async function ImageUploadUtil2(fileBuffer) {
  return new Promise((resolve, reject) => {
    // Use cloudinary's upload_stream to handle the buffer
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },  // Automatically detect file type
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    // Stream the buffer to Cloudinary
    uploadStream.end(fileBuffer);
  });
}

module.exports = { ImageUploadUtil2 };