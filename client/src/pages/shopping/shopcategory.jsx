import { ShoppingProductTile } from "@/components/shopping/shopping-product-tile";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice/cart-slice";
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

  switch (category) {
    case "havan":
      title = "Havan Essentials";
      items = productList.filter(
        (products) => products.category === "Hawan Essentials"
      );
      image = "/images/banner1.avif";
      break;

    case "dhoop":
      title = "Dhoop & Fragrances";
      items = productList.filter(
        (products) => products.category === "Dhoop & Fragrances"
      );
      image = "/images/banner2.avif";
      break;
    case "sacred":
      title = "Sacred Purification Items";
      items = productList.filter(
        (products) => products.category === "Sacred Purification Items"
      );
      image = "/images/sacredbanner.jpg";
      break;
    case "festival":
      title = "Festival Special Kits";
      items = productList.filter(
        (products) => products.category === "Festival Special Kits"
      );
      image = "/images/festivalbanner.jpg";
      break;
    case "ceremonial":
      title = "Ceremonial & Ritual Kits";
      items = productList.filter(
        (products) => products.category === "Ceremonial & Ritual Kits"
      );
      image = "/images/ceremonialbanner.jpg";
      break;
    case "fest":
      title = "Festival-Based Shopping";
      items = productList.filter(
        (products) => products.category === "Festival-Based Shopping"
      );
      image = "/images/festbanner.jpg";
      break;
    case "ritual":
      title = "Ritual-Specific Shopping";
      items = productList.filter(
        (products) => products.category === "Ritual-Specific Shopping"
      );
      image = "/images/ritualbanner.jpg";
      break;
    default:
      title = "";
      items = "";
      image = "";
  }

  return (
    <>
      <img
        src={image}
        alt={title}
        className="w-auto h-auto lg:h-[500px] lg:w-full"
      />
      <div className="flex felx-row mt-10 ml-4 lg:ml-10">
          <nav style={{ marginBottom: "20px", fontSize: "16px" }}>
            <Link to="/shop/home" className="text-[#5A769E]">
              Home
            </Link>
            &gt;
            <Link to="/shop/category" className="text-[#5A769E]">
              
              Category
            </Link>
            &gt;
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
    </>
  );
}
