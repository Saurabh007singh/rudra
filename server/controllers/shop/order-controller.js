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
      orderStatus:"pending",
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

const changeOrderStatus = async (req, res) => {};

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

module.exports = { createOrder, changeOrderStatus, getAllOrders };
