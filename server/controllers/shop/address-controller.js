const Address=require("../../model/address")


const addAddress=async(req,res)=>{
try {
  const {userId,address,city,pincode,phone,notes}=req.body;

  if(!userId || !address || !city || ! pincode || !phone ){
    return res.status(400).json({
      success:false,
      message:'invlaid data provided'
    })
  }

const newlyCreatedAddress=new Address({
      userId,address,city,pincode,phone,notes
    })

  await newlyCreatedAddress.save();

  res.status(201).json({
    success:true,
    data:newlyCreatedAddress
  })
  
} catch (error) {
  res.status(500).json({
    success:false,
    message:"Error"
  })
}
}

const fetchAllAddress=async(req,res)=>{
  try {
    const {userId}=req.params

    if(!userId){
      return res.status(400).json({
        success:false,
        message:"userId is Required"
      })}

      const addressList=await Address.find({userId})

      return res.status(200).json({
        success:true,
        data:addressList
      })


      
  } catch (error) {
    res.status(500).json({
      success:false,
      messaage:"Error"
    })
  }
  }

  const editAddress=async(req,res)=>{
    try {

      const {addressId,userId}=req.params;
      const formData=req.body;

      if(!userId || !addressId){
        return res.status(400).json({
          success:false,
          message:"userId and addressId is required"
        })
      }

      const address=await Address.findOneAndUpdate({
        _id:addressId,userId
      },formData,{new:true})

if(!address){
  return res.status(404).json({
    success:true,
    message:"address not found"
  })
}

      return res.status(200).json({
        success:true,
        data:address
      })


      
    } catch (error) {
      res.status(500).json({
        success:false,
        messaage:"Error"
      })
    }
    }

    const deleteAddress=async(req,res)=>{
      try {
        const {userId,addressId}=req.params;
        if(!userId || !addressId){
          return res.status(400).json({
            success:false,
            message:"user and address id is reuired"
          })
        }

      const address=await Address.findOneAndDelete({_id:addressId,userId})

      res.status(200).json({
        success:true,
        data:address
      })


      }catch(error) {
        res.status(500).json({
          success:false,
          messaage:"Error"
        })
      }
      }

module.exports={addAddress,deleteAddress,fetchAllAddress,editAddress}