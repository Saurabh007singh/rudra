import { ShoppingProductTile } from "@/components/shopping/shopping-product-tile";
import { filterOptions } from "@/config/const ";
import { fetchCartItems } from "@/store/shop/cart-slice/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export function Category() {
  const { productList, isLoading } = useSelector(
    (state) => state.adminProducts
  );
  const navigate=useNavigate()
  const dispatch=useDispatch()

  function products(category){
    return productList.filter(products=>products.category===category)
  }
  
  function handleAddToCart(getCurrentProductId) {
      dispatch(
        addToCart({
          userId: user?.id,
          productId: getCurrentProductId,
          quantity: 1,
        })
      ).then(() => {
        dispatch(fetchCartItems({ userId: user?.id }));
        toast({ title: "Product Added to cart" });
      });
    }
  
    function handleGetProductsDetails(getCurrentProductId) {
      navigate(`/shop/product/${getCurrentProductId}`);
    }

  return (
    <>
      <img
        src="/images/banner-mid.webp"
        alt="category banner"
        className="w-auto h-auto lg:h-[400px] lg:w-full"
      />
      <div className="flex felx-row mt-10 ml-4 lg:ml-10">
        <nav style={{ marginBottom: "20px", fontSize: "16px" }}>
          <Link to="/shop/home" className="text-[#5A769E]">
            Home
          </Link>
          &gt;
          <Link className="text-[#9B7442]"> All Categories</Link>
        </nav>
        
      </div>
      <div className="">
          {filterOptions.map(items => <div key={items.id}>
              <section className="py-2 ">
                <div className="container mx-auto px-4">
                  <h2 className="text-[30px] p-2 font-[arial] text-center ">
                    {items.label}
                  </h2>
                </div>
              </section>
              <div className="grid lg:grid-cols-5 gap-4 grid-cols-2 mt-2 mb-2 p-2 lg:mx-10 border">{isLoading? (<>Loading..</>):(products(items.label).map(items=><ShoppingProductTile
                            product={{ ...items }}
                            key={items._id}
                            handleAddToCart={handleAddToCart}
                            handleGetProductsDetails={handleGetProductsDetails}
                          ></ShoppingProductTile>))}</div>
              

            </div>
          )}
        </div>
    </>
  );
}
