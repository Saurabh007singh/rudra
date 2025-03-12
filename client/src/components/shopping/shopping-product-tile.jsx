import { FaCartPlus } from "react-icons/fa";
import { useSelector } from "react-redux";


export function ShoppingProductTile({
  product,
  handleGetProductsDetails,
  handleAddToCart,
}) {

  const {isAuthenticated } = useSelector((state) => state.auth);


  return (

    <div className="flex flex-col justify-between p-1 h-auto md:h-[350px] hover:shadow-lg transition-shadow">
  <div
    onClick={() => handleGetProductsDetails(product?._id)}
    className="h-[70%] overflow-hidden hover:cursor-pointer"
  >
    <img
      src={product.image}
      alt={product.title}
      className="object-cover h-full w-full hover:scale-110 transition-transform duration-300"
    />
  </div>

  <div className="flex flex-col justify-between h-auto md:h-[25%] mt-2 md:mt-0">
    <div className="flex-shrink-0">
      <span className="text-sm md:text-base font-semibold">{product.title}</span>
    </div>

    <div className="flex flex-row justify-between items-center mt-2 md:mt-0 w-full">
      <div className="flex items-end gap-1 w-full">
        <span className="text-[16px] md:text-[20px] font-bold">
          ₹{product.salePrice}
        </span>
        <span
          className={`${
            product.price > product.salePrice ? "line-through" : null
          } text-gray-600 font-semibold text-xs md:text-sm`}
        >
          ₹{product.price}
        </span>
        <span className="text-[#9A713B] text-xs md:text-sm">
          (
          {Math.round(((product.price - product.salePrice) / product.price) * 100)}%
          Off)
        </span>
      </div>
      <div className="flex justify-end">
        {isAuthenticated?<FaCartPlus
          onClick={() => handleAddToCart(product._id)}
          className="text-[#A27E4C] rounded h-7 w-7 hover:scale-125 transition-transform duration-300"
        />:<FaCartPlus
        
        className="text-[#A27E4C] rounded h-7 w-7 hover:scale-125 transition-transform duration-300"
      />}
        
      </div>
    </div>
  </div>
</div>


  
  );
}
