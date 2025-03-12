import { useNavigate } from "react-router-dom";

import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

export const SidebarLeft = () => {
  const navigate = useNavigate();
  const { productList, isLoading } = useSelector(
    (state) => state.adminProducts
  );

  const starProduct=productList.filter(product=>product.starProduct==="true")



  



 

  return (
    <div className="flex flex-col items-center">
  <img
    onClick={()=> navigate("/shop/home")}
    src="https://res.cloudinary.com/dxojsxiwt/image/upload/v1740723875/qhakpvbysz9foududskw.png"
    alt=""
    // This will make the image itself rounded
  />
  
  <span className="font-medium text-lg mt-5">Featured Products</span>
  
  {isLoading ? (
    <p>Loading</p>
  ) : (
    starProduct.map(item => (
      <div
        className="relative w-[60%] h-auto flex flex-col items-center overflow-hidden mt-4" // Add rounding to the container and hide overflow
        key={item._id}
      >
        <div onClick={() => { navigate(`/shop/product/${item._id}`); }}>
          <img className="object-cover rounded-full border-4" src={item.image} alt="" /> {/* Rounded corners for the product image */}
        </div>
        
        {item?.salePrice > 0 && (
          <Badge className="absolute top-1 left-1 bg-red-600 hover:bg-red-500">
            {Math.round(((item.price - item.salePrice) / item.price) * 100)}% OFF
          </Badge>
        )}
      </div>
    ))
  )}
</div>
  );
};
