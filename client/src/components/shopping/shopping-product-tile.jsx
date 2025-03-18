import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { addToWhishList, fetchWhishList } from "@/store/shop/whish-list-slice";
import { useToast } from "@/hooks/use-toast";

export function ShoppingProductTile({
  product,
  handleGetProductsDetails,
  handleAddToCart,
}) {
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const {whishList}=useSelector(state=>state.whish)

  const { toast } = useToast();
  const index=whishList.indexOf(product?._id)
  


   function handleAddToWhishList() {
     
      dispatch(
        addToWhishList({ userId:user?.id, productId:product?._id })
      ).then((data) =>{
        if(data.payload.success===true){
        dispatch(fetchWhishList({userId:user?.id}));
        toast({title:"Product Added to Whish List"})
      }});
    
  }
 

  return (
    <div className=" relative flex flex-col justify-between p-1 h-auto md:h-[350px]  transition-shadow shadow-lg">
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
          <span className="text-sm md:text-base font-semibold">
            {product.title}
          </span>
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
              {Math.round(
                ((product.price - product.salePrice) / product.price) * 100
              )}
              % Off)
            </span>
          </div>
          <div className="flex justify-end">
            {isAuthenticated ? (
              <FaCartPlus
                onClick={() => handleAddToCart(product._id)}
                className="text-[#A27E4C] rounded h-7 w-7 hover:scale-125 transition-transform duration-300"
              />
            ) : (
              <Dialog>
                <DialogTrigger>
                  <FaCartPlus className="text-[#A27E4C] rounded h-7 w-7 hover:scale-125 transition-transform duration-300" />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center">
                      You need to log in
                    </DialogTitle>
                    <DialogDescription className=" text-center">
                      You must log in to add items to the cart. Please log in{" "}
                      <span
                        onClick={() => navigate("/auth/login")}
                        className="font font-semibold underline hover:text-[#A27E4C]"
                      >
                        Here
                      </span>{" "}
                      first.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
      {isAuthenticated ? (
        index !== -1 ?
        <Heart
        style={{fill:'red'}}
          className="absolute text-[red]  top-2 right-2  hover:scale-125 transition-transform duration-200 "
        />:<Heart
        onClick={() => handleAddToWhishList()}
        className="absolute  top-2 right-2 text-[#9A703E] hover:scale-125 transition-transform duration-200 "
      />
      ) : (
        <Dialog>
          <DialogTrigger>
            <Heart className="absolute  top-2 right-2 text-[#9A703E] hover:scale-125 transition-transform duration-200 " />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">
                You need to log in
              </DialogTitle>
              <DialogDescription className=" text-center">
                You must log in to add items to the WhishList. Please log in
                <span
                  onClick={() => navigate("/auth/login")}
                  className="font font-semibold underline hover:text-[#A27E4C]"
                >
                  Here
                </span>
                first.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
