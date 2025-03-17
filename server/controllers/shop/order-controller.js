const createOrder = async (req,res)=>{
  try {
    const {userId,cartItems,addressInfo,orderStatus,paymentMethod,paymentStatus,totalAmount,orderDate,orderUpdateDate,paymentId,payerId}=req.body;
    
  } catch (error) {
    
  }

   

}


// capture the payment
// const capturePayment=async(req,res)=>{}

module.exports={createOrder}