import { filterOptions } from "@/config/const ";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ShoppingProductTile } from "@/components/shopping/shopping-product-tile";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice/cart-slice";
import { useToast } from "@/hooks/use-toast";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ImageSlider from "@/components/shopping/imageslider";
import { useEffect } from "react";
import { saveLocation } from "@/store/shop/location-slice";

export const ShoppingHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { productList, isLoading } = useSelector(
    (state) => state.adminProducts
  );
  const {allBlogs,isBlogLoading}=useSelector(state=>state.blog)
  const { user } = useSelector((state) => state.auth);

  const starProduct = productList.filter(
    (product) => product.starProduct === "true"
  );

  const hawanEssentials = productList.filter(
    (products) => products.category === "Hawan Essentials"
  );
  const dhoop = productList.filter(
    (products) => products.category === "Dhoop & Fragrances"
  );

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

  useEffect(()=>{
    const locationStored=localStorage.getItem("locationStored")
    if(!locationStored){
if ("geolocation" in navigator) {

      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              if (data && data.address) {
              
               const locationData={address:data.address.city,state:data.address.state,country:data.address.country};
         
               dispatch(saveLocation(locationData))
              
                localStorage.setItem("locationStored",true);
              } else {
                console.log("");
              }
            }).catch((error) => {
              console.error("Error");
            });
        },
        (error) => {
          console.error("Error occurred while getting location:", error);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.log("");
              break;
            case error.POSITION_UNAVAILABLE:
              console.log("");
              break;
            case error.TIMEOUT:
              console.log("");
              break;
            case error.UNKNOWN_ERROR:
              console.log("");
              break;
          }
        }
      );
    } else {
      console.log("");
    }
    }else{console.log("")}
    
  },[])


  let recentItems=[]
  const recentlyViewed=JSON.parse(localStorage.getItem("productId"))
  if(productList && recentlyViewed){
     recentItems=productList.filter(items=>recentlyViewed.includes(items._id))
}
  

  return (
    <div className="flex flex-col min-h-screen w-full ">
      <ScrollArea className=" flex  justify-center whitespace-nowrap h-[210px] mb-[-30px] mt-2 ">
        <div className="flex mx-auto my-auto w-max space-x-2 gap-6 p-4 lg:gap-16 md:gap-12 sm:gap-8 xl:gap-24 2xl:gap-28 ">
          {filterOptions.map((item, index) => (
            <div
              onClick={() => navigate(item.path)}
              key={index}
              className="cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className=" flex flex-col items-center gap-1">
                <img
                  src={`/images/${index}.avif`}
                  alt={item.id}
                  className="lg:h-32 lg:w-28 md:h-28 md:w-24 w-20 h-24  object-fit scale-[2]"
                />
                <span className="text-[13px]  font-[arial] ">{item.id}</span>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="" />
      </ScrollArea>
      <ImageSlider></ImageSlider>

      <section className="py-2 ">
        <div className="container mx-auto px-4">
          <h2 className="lg:text-[30px] text-[24px]  p-2 font-serif text-center ">
            Featured Products
          </h2>
        </div>
      </section>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-6 mx-10">
        {isLoading ? (
          <p>Loading</p>
        ) : (
          starProduct.map((item) => (
            <div
              onClick={() => {
                navigate(`/shop/product/${item._id}`);
              }}
              key={item._id}
              className="h-[450px] w-[400px]  shadow-lg "
            >
              <img
                src={item.image}
                alt=""
                className="object-fit h-full w-full hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))
        )}
      </div>

      <section className="py-2 mt-4 ">
        <div className="container mx-auto px-4">
          <h2 className="lg:text-[30px] text-[24px] p-2 font-serif text-center ">
            Hawan Essentials
          </h2>
        </div>
      </section>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:mx-10 lg:gap-2 gap-1   ">
        {isLoading ? (
          <>Loading</>
        ) : (
          hawanEssentials
            .slice(0, 4)
            .map((items) => (
              <ShoppingProductTile
                product={{ ...items }}
                key={items._id}
                handleAddToCart={handleAddToCart}
                handleGetProductsDetails={handleGetProductsDetails}
              ></ShoppingProductTile>
            ))
        )}
      </div>

      <div className="lg:mx-10 mt-6 ">
        <img src="/images/banner-mid.avif" alt="" className="w-full" />
      </div>

      <section className="py-2 ">
        <div className="container mx-auto px-4">
          <h2 className="lg:text-[30px] text-[24px] p-2 font-serif text-center ">
            Dhoop & Fragnances
          </h2>
        </div>
      </section>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:mx-10 lg:gap-2 gap-1 ">
        {isLoading ? (
          <>Loading</>
        ) : (
          dhoop
            .slice(0, 4)
            .map((items) => (
              <ShoppingProductTile
                product={{ ...items }}
                key={items._id}
                handleAddToCart={handleAddToCart}
                handleGetProductsDetails={handleGetProductsDetails}
              ></ShoppingProductTile>
            ))
        )}
      </div>

      
{recentlyViewed?  <section className="py-2 ">
        <div className="container mx-auto px-4">
          <h2 className="lg:text-[30px] text-[24px] p-2 font-serif text-center ">
            Recently Viewed
          </h2>
        </div>
      </section>:null}
     
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:mx-10 lg:gap-2 gap-1 ">
        {isLoading && recentlyViewed ? (
          <>Loading</>
        ) : (
          recentItems.slice(0, 4)
            .map((items) => (
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
          <h2 className="lg:text-[30px] text-[24px] p-2 font-serif text-center ">
            Our Videos
          </h2>
        </div>
      </section>

      <Carousel
        opts={{
          align: "end",
        }}
        className="w-[80%] mx-auto lg:w-[90%] "
      >
        <CarouselContent >
          {Array.from({ length: 5 }).map((_, index) => (
         <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5 sm:basis-1/3">
         <div className="p-1">
           <Card className="h-full flex-shrink-0">
             <CardContent className="flex aspect-square items-center justify-center p-6 ">
               <span className="text-3xl font-semibold text-ellipsis overflow-hidden whitespace-nowrap">{index + 1}</span>
             </CardContent>
           </Card>
         </div>
       </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* <div className="lg:mx-10 my-3 mt-2">
        <img src="/images/why-choose.webp" alt="" />
      </div> */}

      

      <div className="mx-10 mt-10 flex flex-col lg:items-start gap-4 mb-10">
        <div>
          <h1 className="text-[18px] text-center font-semibold">About Rudra</h1>
          <span className="text-center">
            Nestasia - India's Most Loved Lifestyle AndHome Decor StoreMake Home
            Special is not only a motto Nestasia follows but also a way to
            celebrate creativity and individuality. With products that are as
            functional as they’re beautiful, Nestasia is a home decor brand with
            a wide range of uniquely designed, quality...
          </span>
        </div>
        <Dialog className="max-w-[800px]">
          <DialogTrigger className="underline text-[#9B703C]">
            Read More...
          </DialogTrigger>
          <DialogContent className="w-[90vw] max-w-[900px] h-[80vh]">
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>

              <ScrollArea className="h-[250px] w-[100%] rounded-md border p-4">
                <DialogDescription>
                  <span>
                    Jokester began sneaking into the castle in the middle of the
                    night and leaving jokes all over the place: under the king's
                    pillow, in his soup, even in the royal toilet. The king was
                    furious, but he couldn't seem to stop Jokester. And then,
                    one day, the people of the kingdom discovered that the jokes
                    left by Jokester were so funny that they couldn't help but
                    laugh. And once they started laughing, they couldn't stop.
                  </span>
                </DialogDescription>
              </ScrollArea>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full py-20 bg-gray-100">
      <h2 className="text-3xl font-semibold text-center mb-12">What Our Customers Say</h2>

      <div className="flex flex-wrap justify-center gap-8 max-w-screen-xl mx-auto">
        {/* Testimony 1 */}
        <div className="flex-1 min-w-[280px] bg-white p-6 rounded-lg shadow-lg text-center">
          <div className="mb-4">
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="John Doe"
              className="w-24 h-24 rounded-full mx-auto object-cover"
            />
          </div>
          <p className="italic text-gray-700 mb-4">
            "This product changed my life! The customer service was exceptional, and I couldn't be happier."
          </p>
          <p className="font-semibold text-gray-900">- John Doe</p>
        </div>

        {/* Testimony 2 */}
        <div className="flex-1 min-w-[280px] bg-white p-6 rounded-lg shadow-lg text-center">
          <div className="mb-4">
            <img
              src="https://randomuser.me/api/portraits/women/2.jpg"
              alt="Jane Smith"
              className="w-24 h-24 rounded-full mx-auto object-cover"
            />
          </div>
          <p className="italic text-gray-700 mb-4">
            "Highly recommended! The best experience I’ve had with an online store. Will definitely return."
          </p>
          <p className="font-semibold text-gray-900">- Jane Smith</p>
        </div>

        {/* Testimony 3 */}
        <div className="flex-1 min-w-[280px] bg-white p-6 rounded-lg shadow-lg text-center">
          <div className="mb-4">
            <img
              src="https://randomuser.me/api/portraits/men/3.jpg"
              alt="Samuel Lee"
              className="w-24 h-24 rounded-full mx-auto object-cover"
            />
          </div>
          <p className="italic text-gray-700 mb-4">
            "Incredible quality and fast shipping. I am thoroughly impressed with the entire experience!"
          </p>
          <p className="font-semibold text-gray-900">- Samuel Lee</p>
        </div>
      </div>
    </div>
    <Carousel
        opts={{
          align: "end",
        }}
        className="w-[80%] mx-auto lg:w-[90%] "
      >
        <section className="py-2 ">
          <div className="container mx-auto px-4">
            <h2 className="lg:text-[30px] text-[24px] p-2 font-serif text-center ">
              Blogs
            </h2>
          </div>
        </section>
        <CarouselContent>
          {allBlogs.map((item,index) => (
            <CarouselItem key={index} className=" md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <div onClick={()=>{navigate(`/shop/blogs/${item._id}`)}} ><div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-[250px] w-full object-fit rounded-t-lg"
                  />
                </div>
                <div className="p-2 text-center">
                  <span className="font-arial text-[18px]">{item.title}</span>
                </div></div>
                  
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <section className="py-2 ">
          <div className="container mx-auto px-4">
            <h2 className="lg:text-[30px] text-[24px] p-2 font-serif text-center ">
              Our Location
            </h2>
          </div>
        </section>
      <div style={{ width: '100%', height: '500px' }}>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224568.90642784548!2d76.9900807!3d28.422601099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5fe8e5c64b1e!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1744029877556!5m2!1sen!2sin"
      width="100%"
      height="450"
      loading="lazy"
      style={{ border: 0 }}
    ></iframe>
  </div>
    </div>
  );
};
