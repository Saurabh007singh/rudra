const { ImageUploadUtil2 } = require("../../helpers/cloudinary2");
const Image = require('../../model/productimages');

const uploadImages = async (req, res) => {
  try {
    
    // Check if exactly 4 files are uploaded
    if (!req.files || req.files.length !== 4) {
      return res.status(400).json({ message: "Exactly 4 files should be uploaded." });
    }

    const existingProduct = await Image.findOne({ productId: req.params.productId });

    if (existingProduct) {
      return res.status(400).json({
        message: "Product images already uploaded. No need to upload again.",
      });
    }

    const imageUrls = [];

    // Loop through each file and upload to Cloudinary
    for (const file of req.files) {
      const result = await ImageUploadUtil2(file.buffer);  // Pass buffer directly to Cloudinary
      imageUrls.push(result.secure_url);  // Store the secure URL
    }

    // Update the product images in the database
    const product = await Image.findOneAndUpdate(
      { productId: req.params.productId },
      { $push: { images: { $each: imageUrls } } },
      { new: true, upsert: true }
    );

    // If the product is not found, return an error
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Return the response with the updated product and success message
    res.status(200).json({
      message: 'Images uploaded successfully.',
      product,  // Send back the updated product with image URLs
    });

  } catch (error) {
    console.error("Error during image upload:", error);
    res.status(500).json({ message: 'An error occurred while uploading images.' });
  }
};

const getProductImages = async (req, res) => {
  try {
    
    // Extract productId from the URL params
    const { productId } = req.params;

    // Find the product by productId
    const product = await Image.findOne({ productId });

    // If the product is not found, return an error
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Return the product images in the response
    res.status(200).json({
      success: true,
      data: product.images, // Send the images associated with the product
    });
  } catch (error) {
    console.error("Error fetching product images:", error);
    res.status(500).json({ message: 'An error occurred while fetching product images.' });
  }
};


module.exports = { uploadImages,getProductImages};
