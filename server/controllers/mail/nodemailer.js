const nodemailer=require('nodemailer')

let transporter=nodemailer.createTransport({
  service:'gmail',
  auth:{
    user:process.env.EMAIL,
    pass:process.env.SMTP_PASS
  }
})

const sendMail=async(req,res)=>{
const {to,orderData,totalAmount}=req.body
subject="Order confirmation"
emailHtml=`
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #4CAF50;
        font-size: 24px;
      }
      h2 {
        color: #333;
        font-size: 20px;
      }
      h3 {
        color: #333;
        font-size: 18px;
      }
      ul {
        list-style-type: none;
        padding: 0;
      }
      li {
        margin-bottom: 10px;
        font-size: 16px;
      }
      .total {
        font-size: 18px;
        font-weight: bold;
        color: #4CAF50;
        margin-top: 20px;
      }
      .address {
        font-style: italic;
        color: #555;
        margin-top: 10px;
      }
      .product-image {
        width: 80px; /* adjust the size */
        height: auto;
        max-width: 100%; /* ensures the image doesn’t exceed the width of the container */
        display: block;
        margin-bottom: 10px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Congrats, User!</h1>
      <h2>Your order is confirmed! We will initiate shipping within one working day.</h2>
      <p>Thank you for your order!</p>

      <h3>Order Details:</h3>
      <ul>
        ${orderData.cartItems.map(
          (item) => `
          <li>
            <strong>${item.title}</strong><br>
            <img src="${item.image}" class="product-image" alt="${item.title}" />
            Price: ₹${item.salePrice > 0 ? item.salePrice : item.price} x ${item.quantity}
          </li>`
        ).join('')}
      </ul>

      <div class="total">
        <h3>Total Amount: ₹${totalAmount}</h3>
      </div>

      <div class="address">
        <h3>Shipping Address:</h3>
        <p>${orderData.address.address}</p>
      </div>
    </div>
  </body>
</html>`

let mailOptions={
  from:process.env.EMAIL,
  to:to,
  subject:subject,
  html:emailHtml
}
  try {
    let info=await transporter.sendMail(mailOptions)
    res.status(200).json({
      success:true,
      message:"Email sent successfully",
      response:info.response
    })
    
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"something went wrong"
    })
  }
}

module.exports={sendMail}