import { ShoppingProductTile } from "@/components/shopping/shopping-product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config/const ";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice/cart-slice";
import { fetchAllShopProducts } from "@/store/shop/product-slice";
import {
  DropdownMenu,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@radix-ui/react-dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const ShoppingListing = () => {
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { user } = useSelector((state) => state.auth);
const {toast} =useToast()


const array=[0,1,2,3,4,5,6]

  //fetch list of products
  const dispatch = useDispatch();
  const [sort, setSort] = useState("price-lowtohigh");
  const navigate = useNavigate();

  useEffect(() => {
    if (sort !== null) dispatch(fetchAllShopProducts({ sortParams: sort }));
  }, [dispatch, sort]);

  function handleSort(value) {
    setSort(value);
  }

  function handleGetProductsDetails(getCurrentProductId) {
    navigate(`/shop/product/${getCurrentProductId}`);
  }

  function handleAddToCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then(()=>{
           dispatch(fetchCartItems({userId:user?.id}))
            toast({title:"Product Added to cart"})
      })
  }



  return (
    <div className="">
      <img src="/images/banner2.avif" alt="banner image"  className="w-full h-[400px] object-cover object-center"/>
      <div className="flex felx-row  ml-4 lg:ml-14">
          <nav style={{ marginBottom: "20px", fontSize: "16px" }}>
            <Link to="/shop/home" className="text-[#5A769E]">
              Home
            </Link>
            &gt;
            <Link to="/shop/listing" className="text-[#9A733F]">
              
              All Products
            </Link>

 
          </nav>
        </div>
        <div className="lg:p-4 p-2 border-b flex items-center justify-between lg:mx-10 mx-4">
          <h2 className="text-md font-semibold">All products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">10 products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4"></ArrowUpDownIcon>
                  <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] ">
                <DropdownMenuRadioGroup onValueChange={handleSort}>
                  {sortOptions.map((sortItems) => (
                    <DropdownMenuRadioItem
                      value={sortItems.id}
                      className="cursor-pointer"
                      key={sortItems.id}
                    >
                      {sortItems.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid lg:grid-cols-5 mx-2  grid-cols-2 lg:gap-6 gap-2 lg:mx-10 lg:mt-10 mt-4 mb-10">
          {
            productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    product={productItem}
                    handleGetProductsDetails={handleGetProductsDetails}
                    key={productItem._id}
                    handleAddToCart={handleAddToCart}
                  />
                ))
              : null
            //
          }
        </div>
    </div>
  );
};
