import SimpleImageSlider from "react-simple-image-slider";
import { filterOptions } from "@/config/const ";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ShoppingProductTile } from "@/components/shopping/shopping-product-tile";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice/cart-slice";
import { useToast } from "@/hooks/use-toast";



import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export const ShoppingHome = () => {
  const images = [
    { url: "/images/banner1.avif" },
    { url: "/images/banner2.avif" },
  ];
  const mobileImages = [
    { url: "/images/mobilebanner1.avif" },
    { url: "/images/mobilebanner2.avif" },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { productList, isLoading } = useSelector(
    (state) => state.adminProducts
  );
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

  return (
    <div className="flex flex-col min-h-screen w-full ">
      <ScrollArea className=" flex  justify-center whitespace-nowrap h-[210px] mb-[-30px] mt-2 ">
        <div className="flex mx-auto my-auto w-max space-x-2 gap-6 p-4 lg:gap-20 md:gap-12 sm:gap-8">
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
                  className="h-32 w-28 object-fit scale-[2]"
                />
                <span className="text-[13px]  font-[arial] ">
                  {item.id}
                </span>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="" />
      </ScrollArea>
      <div className="relative w-full h-[auto] hidden lg:block md:block sm:block ">
        <SimpleImageSlider
          width="100%"
          height={500}
          images={images}
          showNavs={true}
          autoPlay={true}
          autoPlayDelay={2.0}
        />
      </div>
      <div className="relative w-[full] h-[auto] lg:hidden md:hidden sm:hidden  ">
        <SimpleImageSlider
          width="100%"
          height={500}
          images={mobileImages}
          showNavs={true}
          autoPlay={true}
          autoPlayDelay={2.0}
        />
      </div>

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
            <div onClick={() => { navigate(`/shop/product/${item._id}`); }} key={item._id} className="h-[450px] w-[400px]  shadow-lg ">
              <img src={item.image} alt=""  className="object-cover h-full w-full hover:scale-110 transition-transform duration-300"/>
              
            </div>
          ))
        )}
      </div>


      <section className="py-2 ">
        <div className="container mx-auto px-4">
          <h2 className="lg:text-[30px] text-[24px] p-2 font-serif text-center ">
            Hawan Essentials
          </h2>
        </div>
      </section>
      <div className="grid lg:grid-cols-4 gap-4 grid-cols-2 mb-2 p-2 lg:mx-10  ">
        {isLoading ? (
          <>Loading</>
        ) : (
          hawanEssentials.map((items) => (
            <ShoppingProductTile
              product={{ ...items }}
              key={items._id}
              handleAddToCart={handleAddToCart}
              handleGetProductsDetails={handleGetProductsDetails}
            ></ShoppingProductTile>
          ))
        )}
      </div>

      <div className="lg:mx-10 w-full h-auto ">
        <img src="/images/banner-mid.avif" alt="" />
      </div>


      <section className="py-2 ">
        <div className="container mx-auto px-4">
          <h2 className="lg:text-[30px] text-[24px] p-2 font-serif text-center ">
            Dhoop & Fragnances
          </h2>
        </div>
      </section>
      <div className="grid lg:grid-cols-5 gap-4 grid-cols-2 mt-2 mb-2 p-2 lg:mx-10 ">
        {isLoading ? (
          <>Loading</>
        ) : (
          dhoop.map((items) => (
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
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className=" md:basis-1/2 lg:basis-1/5">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

      <div className="lg:mx-10 my-3">
        <img src="/images/why-choose.webp" alt="" />
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
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className=" md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>


<div className="mx-10 mt-10 flex flex-col lg:items-start gap-4 mb-10">
<div >
  <h1 className="text-[18px] text-center font-semibold">About Rudra</h1>
  <span className="text-center">Nestasia - India's Most Loved Lifestyle AndHome Decor StoreMake Home Special is not only a motto Nestasia follows but also a way to celebrate creativity and individuality. With products that are as functional as they’re beautiful, Nestasia is a home decor brand with a wide range of uniquely designed, quality...

</span>
</div>
<Dialog className="max-w-[800px]">  {/* Adjust max width for the dialog */}
  <DialogTrigger className="underline text-[#9B703C]">Read More...</DialogTrigger>
  <DialogContent className="w-[90vw] max-w-[900px] h-[80vh]"> {/* Increase width & height */}
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      
        <ScrollArea className="h-[250px] w-[100%] rounded-md border p-4">
          <DialogDescription> 
          <span>Jokester began sneaking into the castle in the middle of the night and leaving
          jokes all over the place: under the king's pillow, in his soup, even in the
          royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
          then, one day, the people of the kingdom discovered that the jokes left by
          Jokester were so funny that they couldn't help but laugh. And once they
          started laughing, they couldn't stop.</span>
          </DialogDescription>
        </ScrollArea>
      
    </DialogHeader>
  </DialogContent>
</Dialog>


</div>
  

    </div>
  );
};
