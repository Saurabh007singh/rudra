const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dxojsxiwt',
  api_key: '486587562145179',
  api_secret: 'CG617xujmhsBrq3ojBbyQULPxxw',
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