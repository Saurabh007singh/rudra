import { Link } from "react-router-dom";

export function Blogs(){
return(<div className="flex flex-col ">
  
<img src="/images/blogs.webp" alt="" />
<div className="flex felx-row mt-5 ml-4 lg:ml-10">
          <nav style={{ marginBottom: "20px", fontSize: "16px" }}>
            <Link to="/shop/home" className="text-[#5A769E]">
              Home
            </Link>{" "}
            &gt;
            <span className="text-[#5A769E]">
              
              Blogs
            </span>
           
          </nav>
        </div>
</div>)
}