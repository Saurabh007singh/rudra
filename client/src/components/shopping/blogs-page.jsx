import { getBlog } from "@/store/admin/blogslice"
import { ChevronRight } from "lucide-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"

export function BlogsPage(){
const {singleBlog}=useSelector(state=>state.blog)

const params=useParams()

const dispatch=useDispatch()

useEffect(()=>{
dispatch(getBlog({id:params?.id}))
},[dispatch,params.id])


const formatContent = (content) => {
  if(content) return content.split('\n').map((text, index) => (
    <span key={index}>
      {text}
      <br />
    </span>
  ));
};

  return<>
  <div className="flex felx-row mt-4 ml-4 lg:ml-10 ">
        <nav style={{ marginBottom: "20px", fontSize: "16px" }} className="flex flex-row text-[12px]">
          <Link to="/shop/home" className="text-[#5A769E] text-[14px]">
            Home
          </Link>
          <ChevronRight className="text-slate-500"/>
          <Link to="/shop/blogs" className="text-[#5A769E] text-[14px]">Our Blog</Link>
          <ChevronRight className="text-slate-500"/>
          <Link className="text-[#9B7442] text-[14px]">{params.id}</Link>
        </nav>
      </div>
  <div className="flex flex-col gap-2 items-center">
          
  
  <div className="flex flex-col gap-4 items-center">
      {/* Blog Title */}
      <h1 className="text-3xl font-bold text-center">{singleBlog.title}</h1>

      {/* Blog Content */}
      <div className="flex flex-col gap-4 w-3/4">
        <p className="text-lg">{formatContent(singleBlog.content)}</p>
      </div>
    </div>
  </div>
  </>
}