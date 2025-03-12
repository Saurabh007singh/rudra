const createOrder = async (req,res)=>{
  const {userId,cartItems,addressInfo,orderStatus,paymentMethod,paymentStatus,totalAmount,orderDate,orderUpdateDate,paymentId,payerId}=req.body;

   

}


// capture the payment
// const capturePayment=async(req,res)=>{}

module.exports={createOrder}