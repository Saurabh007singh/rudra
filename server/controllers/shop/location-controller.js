
const Location=require("../../model/locationdata")

const saveLocation=async(req,res)=>{

const {locationData}=req.body;

try {
  if(!locationData)
return res.status(500).json({
  success:false,
  message:""
});

const location=new Location(locationData)

await location.save(locationData)

res.status(200).json({
  success:true,
  message:"data saved successfully"
})
} catch (error) {
  res.status(500).json({
    success:false,
    message:"some error occured"
  }) 
}

}

module.exports={saveLocation}