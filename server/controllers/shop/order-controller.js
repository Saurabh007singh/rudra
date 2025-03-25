const Orders = require("../../model/order");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      address,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    } = req.body;

    if (
      !userId &&
      !cartItems &&
      !address &&
      !totalAmount &&
      !orderDate
    ) {
      return res.status(400).json({
        success: false,
        message: "some error occured",
      });
    }

    const newOrder = new Orders({
      userId,
      cartItems,
      address,
      orderStatus,
      paymentMethod,
      paymentStatus:"pending",
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    });

    await newOrder.save();

    return res.status(200).json({
      success: true,
      data: newOrder,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error,
    });
  }
};

const getSingleOrder = async (req, res) => {

  const {orderId}=req.params;
 

try {
  if(!orderId){
    return res.status(500).json({
      success:false,
      message:"something went wrong"
    })
  }

  const orderIdArray=orderId.split(",")

  const order=await Orders.find({"_id":{$in:orderIdArray}})

  if(!order){
    return res.status(500).json({
      success:false,
      message:"something went wrong"
    })}

 res.status(200).json({
    success:true,
    data:order
  })
  
} catch (error) {
  return res.status(500).json({
    success:false,
    message:"something went wrong"
  })
}
};

const getAllOrders = async (req, res) => {


  try {
    const {userId}=req.params;
  

  if(!userId){
    return res.status(400).json({
    success:false,
    message:"something went worng"
      })  
    }

    const orders=await Orders.find()
  

    return res.status(200).json({
      success:true,
      data:orders
    })

  } catch (error) {
    return res.status(200).json({
      success:false,
      data:"some error occured"
    })
  }


};

const changeOrderStatus=async(req,res)=>{
  const {orderId}=req.params;
  const {formData}=req.body;

try {

  if(!orderId && !formData){
    return res.status(400).json({
      success:false,
      message:"something went wrong"
    })
  }

  const order=await Orders.findById(orderId)

  order.orderStatus=formData.status

  await order.save()

  return res.status(200).json({
    success:true,
    data:order
  })


  

} catch (error) {
  return res.status(400).json({
    success:true,
    message:"something went wrong"
  })
}
  
}

const getUserOrders=async(req,res)=>{
const {userId}=req.params;
  try {
    if(!userId){
      return res.status(400).json({
        success:false,
        message:"something went wrong"
      }) 
    }


    const orders=await Orders.find({userId});

    if(orders.length===0){ return res.status(404).json({
      success:false,
      message:"no orders found for this user"
    })}
   

    res.status(200).json({success:true,
      data:orders
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the orders",
    });
  }
}

module.exports = { createOrder, changeOrderStatus, getAllOrders,getSingleOrder,getUserOrders };
