const express=require("express");
const {upload}=require("../helpers/cloudinary")
const {uploadImages,getProductImages}=require('../controllers/admin/imagecontrol')

const router=express.Router()


router.post('/upload/:productId',upload.array('images',4),uploadImages)
router.get('/images/:productId',getProductImages)

module.exports=router;