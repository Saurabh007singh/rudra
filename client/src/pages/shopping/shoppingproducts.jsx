import { IoLogoFacebook } from "react-icons/io";
import { RiTwitterXFill } from "react-icons/ri";
import { FaPinterestP } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { getImages } from "@/store/imageslice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice/cart-slice";
import {
  fetchProductDetails,
} from "@/store/shop/product-slice";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { filterOptions } from "@/config/const ";
import { ShoppingProductTile } from "@/components/shopping/shopping-product-tile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loading } from "../loading/loading";
import { getReviews } from "@/store/shop/review-slice";
import { ReviewsSection } from "@/components/shopping/review-wrapper";

export function ShoppingProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetails, isFetchProductsLoading } = useSelector(
    (state) => state.shopProducts
  );
  const { productList, isLoading } = useSelector(
    (state) => state.adminProducts
  );
  const { addressList, isAddressLoading } = useSelector(
    (state) => state.address
  );
  const {reviews}=useSelector(state=>state.reviews)
  console.log(reviews)

  

  const array = [1, 2, 3, 4, 5, 6];
  const randomIndex = Math.floor(Math.random() * array.length);

  let list = [];
  let sizeArray = [];

  if (!isFetchProductsLoading && !isLoading && productList.length>0 && productDetails?.productCode) {
    sizeArray = productList.filter(
      (product) =>
        product.productCode === productDetails.productCode &&
        product._id !== productDetails._id
    );

  }

list = productList.filter(
      (product) => product.category === filterOptions[randomIndex].id
    );
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProductDetails({ id })).then(()=>{dispatch(getImages(id))}).then(()=>{dispatch(getReviews(id))});
  }, [dispatch, id]);



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
  //for description
  const formatDescription = (description) => {
    return description.split("  ").map((part, index) => (
      <span key={index}>
        {part}
        {index < description.split("  ").length - 1 && <br />}
      </span>
    ));
  };

  //  for rendring images

  const { images } = useSelector((state) => state.images);

  const mainImage = !isFetchProductsLoading && !isLoading && productList.length>0 && productDetails?.image  ?  productDetails.image: null;

  const slides = [mainImage, ...images.map((image) => image)];

 

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
      {!isFetchProductsLoading ? (
        <div className=" flex flex-col gap-6">
          {isFetchProductsLoading ? (
            <p>Loading...</p>
          ) : productDetails ? (
            <div className="flex felx-row mt-10 ml-4 lg:ml-10">
              <nav style={{ marginBottom: "20px", fontSize: "16px" }}>
                <Link to="/shop/home" className="text-[#5A769E]">
                  Home
                </Link>
                &gt;
                <Link to="/shop/listing" className="text-[#5A769E]">
                  Products
                </Link>
                &gt;
                <Link
                  to={`/shop/product/${productDetails._id}`}
                  className="text-[#9B7442]"
                >
                  {productDetails.title}
                </Link>
              </nav>
            </div>
          ) : null}

          {isFetchProductsLoading ? (
            <p>Loading...</p>
          ) : productDetails ? (
            <div className="flex w-full flex-col lg:flex-row md:flex-row ">
              <div className="lg:w-[50%] md:w-[50%] lg:px-20 ">
                <Carousel className="relative">
                  <CarouselContent>
                    {slides.map((items) => (
                      <CarouselItem key={items}>
                        <img
                          src={items}
                          className="p-1 w-full h-[400px] lg:h-[550px] md:h-[500px] object-cover rounded-lg"
                          alt="product Image"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
                <div className=" grid grid-cols-5 p-3 ">
                  {slides.map((items) => (
                    <img
                      key={items}
                      className="h-20 w-20 border rounded-sm"
                      src={items}
                    />
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 w-full h-[auto] ">
                <div className=" flex flex-col gap-3 lg:items-start items-center  lg:justify-items-start  ">
                  <div className=" inline-block  text-center  lg:text-left">
                    <h1 className="text-[30px] font-arial leading-tight">
                      {productDetails.title}
                    </h1>
                  </div>

                  <div className="flex items-end lg:justify-start  justify-center gap-2 w-full">
                    <span className="text-[35px] font-semibold  ">
                      ₹{productDetails.salePrice}
                    </span>
                    <span
                      className={`${
                        productDetails.price > productDetails.salePrice
                          ? "line-through"
                          : null
                      } text-gray-600 text-[25px] mb-1 font-extralight`}
                    >
                      ₹{productDetails.price}
                    </span>
                    <span className="text-[#C24352] text-[25px] mb-1 font-semibold ">
                      {Math.round(
                        ((productDetails.price - productDetails.salePrice) /
                          productDetails.price) *
                          100
                      )}
                      % Off
                    </span>
                  </div>

                  <div className="flex flex-col items-center lg:items-start">
                    <span className="text-md font-lg mt-1 text-slate-500">
                      Inclusive Of All Taxes
                    </span>
                    <span className="text-[#9B7139] mt-1 ">
                      Want to buy this in bulk?
                      <Link className="hover:text-[black] hover:underline">
                        Click Here
                      </Link>
                    </span>
                  </div>
                  <span className="text-[16px] font-semibold font-arial">Choose a different size</span>
                  <div className="flex flex-row gap-2 ">
          
                    {sizeArray.map((items) => (
                      <div
                      onClick={()=>{navigate(`/shop/product/${items._id}`)}}
                        key={items._id}
                        className="h-10 w-20 bg-[white] border-[3px] border-dashed border-[#786B4A] flex items-center justify-center hover:scale-110 transition duration-200  "
                      >
                        <div className="p-[1px] text-[#786B4A] font-arial font-semibold">{items.size}</div>
                      </div>
                    ))}
                  </div>

                  <div className="w-[90%] border h-40 mt-1"></div>

                  {isAuthenticated ? (
                    <div className="flex w-full lg:justify-start justify-center flex-row gap-2 mt-4 ">
                      {productDetails.totalStock != 0 ? (
                        <button
                          className="text-md w-[44%] h-12 bg-[#786B4A] text-white"
                          onClick={() => handleAddToCart(productDetails._id)}
                        >
                          Add To Cart
                        </button>
                      ) : (
                        <button className="text-md w-[44%] h-12 bg-[#a32727] text-white">
                          !Out of Stock
                        </button>
                      )}

                      {!isAddressLoading ? (
                        <>
                          {addressList.length !== 0 ? (
                            <button
                              onClick={() => {
                                navigate("/checkout");
                                setOpenCartSheet(false);
                              }}
                              className="w-[45%]  text-md h-12 bg-[#786B4A] text-white "
                            >
                              CheckOut
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                navigate("/shop/account");
                                setOpenCartSheet(false);
                              }}
                              className="w-[45%]  text-md h-12 bg-[#786B4A] text-white "
                            >
                              Add Address
                            </button>
                          )}
                        </>
                      ) : (
                        <>Loading</>
                      )}
                    </div>
                  ) : (
                    <div className="flex w-full lg:justify-start justify-center flex-row gap-2 mt-4 ">
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="text-md w-[45%] h-12 bg-[#786B4A] text-white">
                            Add To Cart
                          </button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="text-center">
                              You need to log in
                            </DialogTitle>
                            <DialogDescription className=" text-center">
                              You must log in to add items to the cart. Please
                              log in
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
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="text-md w-[45%] h-12 bg-white text-[#786B4A] border">
                            Buy Now
                          </button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="text-center">
                              You need to log in
                            </DialogTitle>
                            <DialogDescription className=" text-center">
                              You must log in to add items to the cart. Please
                              log in
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
                    </div>
                  )}
                  <div className="flex flex-row gap-2">
                    <IoLogoFacebook className="w-6 h-6 text-[#786B4A]" />
                    <RiTwitterXFill className="w-6 h-6 text-[#786B4A]" />
                    <FaPinterestP className="w-6 h-6 text-[#786B4A]" />
                  </div>
                  <Accordion type="single" collapsible className="w-[90%]">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-[20px] font-arial">
                        Description
                      </AccordionTrigger>
                      <AccordionContent className="text-[15px] font-arial">
                        {formatDescription(productDetails.description)}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type="single" collapsible className="w-[90%]">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-[20px] font-arial">
                        Features
                      </AccordionTrigger>
                      <AccordionContent className="text-[15px] font-arial">
                        {formatDescription(productDetails.features)}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type="single" collapsible className="w-[90%]">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-[20px] font-arial">
                        Size & Details
                      </AccordionTrigger>
                      <AccordionContent className="text-[15px] font-arial">
                        {formatDescription(productDetails.size)}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type="single" collapsible className="w-[90%]">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-[20px] font-arial">
                        Products Included
                      </AccordionTrigger>
                      <AccordionContent className="text-[15px] font-arial">
                        {formatDescription(productDetails.productsIncluded)}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type="single" collapsible className="w-[90%]">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-[20px] font-arial">
                        Returns
                      </AccordionTrigger>
                      <AccordionContent className="text-[15px] font-arial">
                        {formatDescription(productDetails.returns)}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type="single" collapsible className="w-[90%]">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-[20px] font-arial">
                        Care Instructions
                      </AccordionTrigger>
                      <AccordionContent className="text-[15px] font-arial">
                        {formatDescription(productDetails.careInstructions)}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type="single" collapsible className="w-[90%]">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-[20px] font-arial">
                        Shipping
                      </AccordionTrigger>
                      <AccordionContent className="text-[15px] font-arial"></AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type="single" collapsible className="w-[90%]">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-[20px] font-arial">
                        More information
                      </AccordionTrigger>
                      <AccordionContent className="text-[15px] font-arial">
                        {formatDescription(productDetails.moreInfo)}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          ) : (
            <p>No product found</p>
          )}

          <section className="py-2 ">
            <div className="container mx-auto px-4">
              <h2 className="text-[30px] p-2 font-[arial] text-center ">
                Also Try
              </h2>
            </div>
          </section>
          <div className="grid lg:grid-cols-4 gap-4 grid-cols-2 mb-2 p-2 lg:mx-10 border ">
            {isLoading ? (
              <>Loading</>
            ) : (
              list.map((items) => (
                <ShoppingProductTile
                  product={{ ...items }}
                  key={items._id}
                  handleAddToCart={handleAddToCart}
                  handleGetProductsDetails={handleGetProductsDetails}
                ></ShoppingProductTile>
              ))
            )}
          </div>
          <ReviewsSection reviews={reviews}></ReviewsSection>
        </div>
      ) : (
        <Loading></Loading>
      )}
    </>
  );
}
