import { ShoppingProductTile } from "@/components/shopping/shopping-product-tile";
import { filterOptions } from "@/config/const ";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice/cart-slice";
import { ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

export function ShoppingCategory() {
  const { category } = useParams();
  const { productList, isLoading } = useSelector(
    (state) => state.adminProducts
  );
  const dispatch=useDispatch()
const navigate=useNavigate()

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

      
    function handleGetProductsDetails(getCurrentProductId) {
      navigate(`/shop/product/${getCurrentProductId}`);
    }

  let title = "";
  let items = [];
  let image = "";
  let image2=""

  switch (category) {
    case "havan":
      title = "Havan Essentials";
      items = productList.filter(
        (products) => products.category === "Hawan Essentials"
      );
      image = "/images/banner1.avif";
      image2="/images/mobilebanner2.avif"
      break;

    case "dhoop":
      title = "Dhoop & Fragrances";
      items = productList.filter(
        (products) => products.category === "Dhoop & Fragrances"
      );
      image = "/images/banner2.avif";
      image2="/images/mobilebanner1.avif"
      break;
    case "sacred":
      title = "Sacred Purification Items";
      items = productList.filter(
        (products) => products.category === "Sacred Purification Items"
      );
      image = "/images/banner3.avif";
      image2="/images/mobilebanner3.avif"
      break;
    case "festival":
      title = "Festival Special Kits";
      items = productList.filter(
        (products) => products.category === "Festival Special Kits"
      );
      image = "/images/banner4.avif";
      image2="/images/mobilebanner4.avif"
      break;
    case "ceremonial":
      title = "Ceremonial & Ritual Kits";
      items = productList.filter(
        (products) => products.category === "Ceremonial & Ritual Kits"
      );
      image = "/images/banner5.avif";
      image2="/images/mobilebanner5.avif"
      break;
      case "ornaments":
      title = "Ornaments & Wearables";
      items = productList.filter(
        (products) => products.category === "Ornaments & Wearables"
      );
      image = "/images/ornaments.avif";
      image2="/images/mobilebanner6.avif"
      break;
      
    default:
      title = "";
      items = "";
      image = "";
  }

  const lastword=window.location.pathname.split('/').filter(Boolean).pop();

  const list=filterOptions.filter(products=>products.img != lastword )


  

  return (
    <>
      <img
        src={image}
        alt={title}
        className="w-auto h-auto lg:h-[450px] xl:h-[500px] 2xl:h-[600px]  lg:w-full hidden lg:block md:block sm:block"
      />
      <img
        src={image2}
        alt={title}
        className="w-auto h-auto lg:h-[500px] lg:w-full lg:hidden md:hidden sm:hidden"
      />
     
      <div className="flex flex-row mt-4 ml-4 lg:ml-10">
          <nav style={{ marginBottom: "20px", fontSize: "16px" }} className="flex flex-row">
            <Link to="/shop/home" className="text-[#5A769E] text-[14px]">
              Home
            </Link>
            <ChevronRight className="text-slate-500"/>
            <Link to="/shop/category" className="text-[#5A769E] text-[14px]">
              
              All Category
            </Link>
            <ChevronRight className="text-slate-500 text-[14px]"/>
            <Link
              className="text-[#9B7442]"
            >
             
              {title}
            </Link>
          </nav>
        </div>

        

        <section className="py-2 ">
        <div className="container mx-auto px-4">
          <h2 className="text-[30px] p-2 font-[arial] text-center ">
            {title}
          </h2>
        </div>
      </section>
      <div className="grid lg:grid-cols-4 gap-4 grid-cols-2 mt-2 mb-2 p-2 lg:mx-10">
        {isLoading ? (
          <>Loading</>
        ) : (
          items.map((items) => (
            <ShoppingProductTile
              product={{ ...items }}
              key={items._id}
              handleAddToCart={handleAddToCart}
              handleGetProductsDetails={handleGetProductsDetails}
            ></ShoppingProductTile>
          ))
        )}
      </div>
      <section className="py-2 ">
        <div className="container mx-auto px-4">
          <h2 className="text-[30px] p-2 font-[arial] text-center ">
            Explore more categories
          </h2>
        </div>
      </section>

      <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2  gap-4 mx-10">
      {list.map(items=>{ return <div onClick={()=>{navigate(items.path)}} key={items.id} className="flex flex-col"><img  src={`/images/${items.icon}.avif` } alt={items.id} className="rounded-lg"/><span className="text-center">{items.id}</span></div>
     
      })}
      </div>
    </>
  );
}
