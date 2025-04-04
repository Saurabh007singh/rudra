
const Blogs=require("../../model/blogs")



const addBlog=async(req,res)=>{
try {

  const {image,title,content}=req.body



  if(!image && !title && !content){
    return res.status(400).json({
      success:false,
      message:"no data got"
    })
  }
  const blog=new Blogs({image,content,title})
  await blog.save();

  res.status(200).json({
    success:true,
    message:"successfully addded",
    data:blog
  })
  
} catch (error) {
  return res.status(400).json({
success:false,
message:"something went wrong"
  })
}
}

const getAllBlogs=async(req,res)=>{
  try {
    const blogs=await Blogs.find()
  res.status(200).json({
    success:true,
    data:blogs
  })
  } catch (error) {
    return res.status(400).json({
  success:false,
  message:"something went wrong"
    })
  }
}

const getBlog=async(req,res)=>{
  try {
  const {id}=req.params

  if(!id){
    return res.status(400).json({
      success:false,
      message:"no data got"
    })
  }

const blog=await Blogs.findById(id)
if(!blog){
  return res.status(400).json({
    success:false,
    message:"no data got"
  })
}
res.status(200).json({
  success:true,
  data:blog
})


  } catch (error) {
    return res.status(400).json({
  success:false,
  message:"something went wrong"
    })
  }
}



const deleteBlog=async(req,res)=>{
  try {
  const {id}=req.params;
  
  if(!id){
    return res.status(400).json({
      success:false,
      message:"no data got"
    })
  }

  await Blogs.findByIdAndDelete(id)


  res.status(200).json({
success:true,message:"deleted successfully"
  })
 
  } catch (error) {
    return res.status(400).json({
  success:false,
  message:"something went wrong"
    })
  }
}

const editBlog=async(req,res)=>{
  try {
  const {id}=req.params;
  const {image,title,content}=req.body

  if(!image && !title && !content){
    return res.status(400).json({
      success:false,
      message:"no data got"
    })
  }

   const blog=await Blogs.findById(id);

      if(!blog) return res.status(404).json({
        success:false,
        message:"product not found"
      });

      blog.title=title || blog.title;
      blog.content=content|| blog.content;

      await blog.save();

      res.status(200).json({
        success:true,
        data:blog
      })

  } catch (error) {
    return res.status(400).json({
  success:false,
  message:"something went wrong"
    })
  }
}


module.exports={addBlog,getBlog,getAllBlogs,deleteBlog,editBlog}