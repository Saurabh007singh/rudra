
import { useSelector } from "react-redux";
import { Loading } from "../loading/loading";

import { useNavigate } from "react-router-dom";

export function Blogs() {
  const { allBlogs, isBlogLoading } = useSelector((state) => state.blog);

  const navigate = useNavigate();

 
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {/* Title Section */}
      <img src="/images/blogs.webp" alt="Blogs" className="w-full h-auto" />
      <span className="underline text-[#96865D] font-semibold font-arial text-xl">
        All Blogs
      </span>

      {/* Blog Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-10">
        {!isBlogLoading ? (
          <>
            {allBlogs.map((item) => (
              <div
                key={item._id}
                onClick={() => {
                  navigate(`/shop/blogs/${item._id}`);
                }}
                className="flex flex-col items-center border shadow-2xl mb-4 gap-2 rounded-lg hover:shadow-xl transition-all"
              >
                <div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-[250px] w-full object-fit rounded-t-lg"
                  />
                </div>
                <div className="p-2 text-center">
                  <span className="font-arial text-[18px]">{item.title}</span>
                </div>
              </div>
            ))}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
