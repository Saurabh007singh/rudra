const Whish=require("../../model/whishlist")

const addToWhish=async(req,res)=>{

try {
 const {userId,productId}=req.body;

 if(!userId || !productId){
  return res.status(400).json({
    success:false,
    message:"either product id or userId not found"
  })
 } 

 let whish=await Whish.findOne({userId})

 if(!whish){
  whish=new Whish({userId,productId:[]})
 }

 const findCurrentProductIndex=whish.productId.findIndex(item=>item.toString()===productId)

 if(findCurrentProductIndex === -1){
  whish.productId.push(productId)
 }else{
  return res.status(400).json({
    success:false,
    message:"product already exists inside the whishlist"
  })
 }

 await whish.save();
 res.status(200).json({
  success:true,
  data:whish
 })


} catch (error) {
  res.status(500).json({
    success:false,
    message:"some error occured"
  })
}

}


const fetchWhishList=async(req,res)=>{
  try {

    const {userId}=req.params;

    if(!userId){
      return res.status(404).json({
        success:false,
        message:"userId not found"
      })
    }

    let whish=await Whish.findOne({userId});

    return res.status(200).json({
      success:true,
      data:whish
    })
    
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"some error occured"
    })
  }
}


const deletefromWhish=async(req,res)=>{

  try {
   const {userId,productId}=req.params;
  
   if(!userId || !productId){
    return res.status(400).json({
      success:false,
      message:"either product id or userId not found"
    })
   } 

   const whish=await Whish.findOne({userId})

   if(!whish){
    return res.status(404).json({
      success:false,
      message:"user not found"
    })
   }

   const findCurrentProductIndex=whish.productId.findIndex(item=>item.toString()===productId)

   if(findCurrentProductIndex===-1){
    return res.status(404).json({
      success:false,
      message:"product not found"
    })
   }



   whish.productId=whish.productId.filter(item=>item.toString()!== productId)

   await whish.save();

   res.status(200).json({
    success:true,
    message:"items deleted successfully",
    data:whish
   })
  
   
  
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"some error occured"
    })
  }
  
  }


module.exports= {addToWhish,deletefromWhish,fetchWhishList}