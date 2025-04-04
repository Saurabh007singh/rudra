const express=require("express");
const handleBlogs=require("../controllers/admin/blogcontroller")

const router=express.Router();

router.post("/add",handleBlogs.addBlog)
router.get("/get",handleBlogs.getAllBlogs)
router.delete("/delete/:id",handleBlogs.deleteBlog)
router.get("/get/:id",handleBlogs.getBlog)
router.put("/edit/:id",handleBlogs.editBlog)


module.exports=router