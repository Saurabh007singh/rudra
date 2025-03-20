const Cart = require("../../model/cart");
const Product = require("../../model/product");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) { 
      return res
        .status(400)
        .json({ success: false, message: "Invalid data provided" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "PRODUCT NOT FOUND" });
    }

    //CHECK WETHER IF IT IS ALREADY PRESENT IN CART

    let cart = await Cart.findOne({ userId });

    if(!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[findCurrentProductIndex].quantity += quantity;
    }

    await cart.save();

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error occured",
    });
  }
};

const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({
        success: false,
        message: "user is mandatory",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    

    if(!cart) {
       return res.status(400).json({
        success: false,
        message: "cart not found",
        
      });
    }

    const validItems=cart.items.filter(productItem=>productItem.productId)

    

    if(validItems.length<cart.items.length){
      cart.items=validItems 
      await cart.save();
    }

    const populateCartItems=validItems.map(item=>({
      productId:item.productId._id,
      image:item.productId.image,
      title:item.productId.title,
      price:item.productId.price,
      salePrice:item.productId.salePrice,
      quantity:item.quantity,

    }))

  

    res.status(200).json({
      success:true,
      data:{
            ...cart._doc,
            items:populateCartItems
      }
    })



  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error occured",
    });
  }
};

const updateCartItemQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid data provided" });
    }

    const cart=await Cart.findOne({userId})
    if (!cart) {
      res.status(404).json({
        success: false,
        message: "cart not found",
      });
    }

    const findCurrentProductIndex=cart.items.findIndex(item=>item.productId.toString() === productId )

    if(findCurrentProductIndex===-1){
        res.status(404).json({
          success: false,
          message: "Cart item not found",
        });
    }
    
    cart.items[findCurrentProductIndex].quantity=quantity

    await cart.save()

    await cart.populate({
      path:'items.productId',
      select: "image title price salePrice",
    })

    const populateCartItems = cart.items.map(item => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));


    res.status(200).json({
      success:true,
      data:{
            ...cart._doc,
            items:populateCartItems,
      }
    })


  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error occured",
    });
  }
};

const deleteCartItems = async (req, res) => {
  try {
    const {userId,productId}=req.params;
    if(!productId || !userId){
      return res.status(404).json({
        success:false,
        message:"invalid data provided"
      })
    }

    const cart=await Cart.findOne({userId}).populate({
      path:'items.productId',
      select:'image title price salePrice',
    })

    if(!cart){
      return res.status(404).json({
        success:false,
        message:"Cart not found",
      });
    }

    cart.items=cart.items.filter(item=>item.productId._id.toString()!==productId)

    await cart.save();

    await cart.populate({
      path:'items.productId',
      select:'image title price salePrice',
    })

    const populateCartItems = cart.items.map(item => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));


    res.status(200).json({
      success:true,
      data:{
            ...cart._doc,
            items:populateCartItems,
      },
      message:"data deleted successfully"
    })


  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error occured",
    });
  }
};

const deleteCart=async(req,res)=>{
try {
  const {userId}=req.params;

      if(!userId){
       return res.status(400).json({
          success:false,
         message:"userId not found"
        })}
          const cart=await Cart.findOne({userId})

          if (!cart) {
            return res.status(404).json({
              success: false,
              message: "Cart not found for this user",
            });
          }

          cart.items=[]

          await cart.save();


             return res.status(200).json({
                success:true,
                message:"items deleted successsfully"
                })
} catch (error) {
  return res.status(404).json({
    success:false,
    message:"some error occured"
  })
}


       


}


module.exports = {
  addToCart,
  updateCartItemQuantity,
  deleteCart,
  fetchCartItems,
  deleteCartItems
};
