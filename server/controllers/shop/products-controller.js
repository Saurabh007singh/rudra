
const Product = require("../../model/product");

const getFilteredProducts = async (req, res) => {

  const {sortBy="price-lowtohigh"}=req.query;

  let sort={}

  switch(sortBy){
    case 'price-lowtohigh':
      sort.price=1
      break;
    case 'price-hightolow':
      sort.price=-1
      break;
    case 'title-atoz':
      sort.title=1
      break;
    case 'title-ztoa':
      sort.title=-1
      break;
    default:
      sort.price=1
      break;  
  }

  try {
    
    const products = await Product.find({}).sort(sort);
    res.status(200).json({
      success: true,
      data:products
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

const getProductDetails=async(req,res)=>{
  try{
   
const {id} =req.params;
const product=await Product.findById(id);

if(!product) return res.status(404).json({
  success:false,
  message:"product not found"
})

return res.status(200).json({
  success:true,
  data:product
})

  }
  catch(error){

  }
}

const getStarProducts=async(req,res)=>{
try {
  
  const product=await Product.find({starProduct:"true"})
  if(!product) return res.status(404).json({
    success:false,
    message:"product not found"
  })

  return res.status(200).json({
    success:true,
    data:product
  })
  
} catch (error) {
  console.log(error)
  res.status(500).json({
    success:false,
    message:"some error occured"
  })
}
}

module.exports ={getFilteredProducts,getProductDetails,getStarProducts};
