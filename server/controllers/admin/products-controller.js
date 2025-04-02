const Product=require("../../model/product")
const { ImageUploadUtil } = require("../../helpers/cloudinary");


const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await ImageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error Occurred",
    });
  }
};


//add a mew product

const addProduct=async(req,res)=>{
  try {
    const {image,title,description,category,brand,price,salePrice,totalStock,productCode,offer,starProduct,features,size,productsIncluded,returns,careInstructions,moreInfo}=req.body;
    
    const newlyCreatedProduct=new Product({image,title,description,category,brand,price,salePrice,totalStock,productCode,offer,starProduct,features,size,productsIncluded,returns,careInstructions,moreInfo});

    await newlyCreatedProduct.save();
    res.status(201).json({
      success:true,
      data:newlyCreatedProduct,
    })


  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Error occured "
      })
    
  }
}

//fetch all products
const fetchAllProducts=async(req,res)=>{
  try {
    const page=parseInt(req.query.page)
    const limit=parseInt(req.query.limit)

    const skip=(page-1)*limit;

    const listOfProducts=await Product.find({}).skip(skip).limit(limit)

    const totalProducts=await Product.countDocuments();

    
    res.status(200).json({
      success:true,
      data:listOfProducts,
      pagination:{
        currentPage:page,
        totalPages:Math.ceil(totalProducts/limit),
        totalProducts:totalProducts,
      }
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Error occured "
      })
    
  }
}

//edit a product
const editProduct=async(req,res)=>{
  try {

     
   const {id}=req.params;

    const {image,title,description,category,brand,price,salePrice,totalStock,productCode,offer,starProduct,features,size,productsIncluded,returns,careInstructions,moreInfo}=req.body;

    const findProduct=await Product.findById(id);
    if(!findProduct) return res.status(404).json({
      success:false,
      message:"product not found"
    });

    findProduct.title=title || findProduct.title;
    findProduct.description=description || findProduct.description;
    findProduct.category=category || findProduct.category;
    findProduct.brand=brand || findProduct.brand;
    findProduct.price=price || findProduct.price;
    findProduct.salePrice=salePrice || findProduct.salePrice;
    findProduct.totalStock=totalStock || findProduct.totalStock
    findProduct.image=image || findProduct.image;
    findProduct.productCode=productCode || findProduct.productCode
    findProduct.offer=offer||findProduct.offer
    findProduct.starProduct=starProduct || findProduct.starProduct
    findProduct.features=features || findProduct.features
    findProduct.size=size ||findProduct.size
    findProduct.productsIncluded=productsIncluded||findProduct.productsIncluded
    findProduct.returns=returns||findProduct.returns
    findProduct.careInstructions=careInstructions||findProduct.careInstructions
    findProduct.moreInfo=moreInfo||findProduct.moreInfo

    await findProduct.save();
    res.status(200).json({
      success:true,
      data:findProduct
    })
   
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Error occured "
      })
    
  }
  
}

//delete a product
const deleteProduct=async(req,res)=>{
  try {
    
    const {id}=req.params;
    const product= await Product.findByIdAndDelete(id);

    if(!product) return res.status(404).json({
      success:false,
      message:"product not found"
    });

    res.status(200).json({
      success:true,
      message:'product deleted successfully'
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Error occured "
      })
    
  }
  
}


module.exports = { handleImageUpload,addProduct,fetchAllProducts,editProduct,deleteProduct };