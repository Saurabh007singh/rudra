const mongoose=require("mongoose")

const URI=process.env.STRING

async function connectDB(){
try {
  mongoose.connect(URI)
  console.log(
    "Connection to db successfully"
  )
} catch (error) {
  console.error("couldnt connect to db",error)
}
}

module.exports=connectDB