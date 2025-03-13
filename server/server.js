require("dotenv").config();
const express = require("express");
const db = require("./utils/db");
const router = require("./router/auth-router");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const adminProductsRouter=require("./router/product-routes")
const shopProductsRouter=require("./router/shopview-products-routes")
const cartProductsRouter=require("./router/cart-routes")
const addressRouter=require("./router/address-routes")
const imageUploadRouter=require("./router/productImages")


const app = express();

const PORT = process.env.PORT;
app.use(
  cors({
    origin:"https://rudra-1-iuwc.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/api/auth", router);
app.use("/api/admin/products",adminProductsRouter)
app.use("/api/shop/products",shopProductsRouter)
app.use("/api/shop/cart",cartProductsRouter)
app.use("/api/address",addressRouter)
app.use("/api",imageUploadRouter)


db().then(() => {
  app.listen(PORT, () => {
    console.log("connected successfully on port 5000");
  });
});
