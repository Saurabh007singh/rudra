
import { Separator } from "@/components/ui/separator";
import { getImages } from "@/store/imageslice";
import SimpleImageSlider from "react-simple-image-slider";

import {
  fetchProductDetails,
} from "@/store/shop/product-slice";
import axios from "axios";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";

export function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetails, isFetchProductsLoading } = useSelector(
    (state) => state.shopProducts
  );

  const {images}=useSelector(state=>state.images)

 

 const mainImage=isFetchProductsLoading ? null:productDetails.image

 const slides=[
    {url:mainImage},...images.map(image=>({url:image}))

 ]





  useEffect(() => {
    // Fetch product details only if it's not already fetched
    dispatch(fetchProductDetails({ id }));
  }, [dispatch, id]);

useEffect(()=>{
dispatch(getImages(id))
  },[dispatch])

  const [selectedImages, setSelectedImages] = useState([]); // State for selected images
  const [uploading, setUploading] = useState(false); // Loading state during the image upload

  // Handle file input change
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 4) {
      alert("You can only upload a maximum of 4 images.");
      return;
    }
    setSelectedImages(Array.from(files)); // Update state with the selected files
  };

  // Handle image upload
  const handleImageUpload = async () => {
    if (selectedImages.length !== 4) {
      alert("Please select exactly 4 images to upload.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    selectedImages.forEach((file) => formData.append("images", file)); // Append all selected files

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/upload/${id}`, // Your backend API endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Assuming the API returns the updated product data
      const updatedProduct = response.data.product;
      alert("Images uploaded successfully!");
      // Update the product with the new image URL
      // You may want to update the state or do a refresh here
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-1 flex">
      {isFetchProductsLoading ? (
        <p>Loading...</p>
      ) : productDetails ? (
        <div className="flex w-full flex-col lg:flex-row md:flex-row ">
          <div className="lg:w-[50%] md:w-[50%]">
          <div>
      <SimpleImageSlider
        width={300}
        height={300}
        images={slides}
        showBullets={true}
        showNavs={true}
      />
    </div>
          </div>

          <div className=" lg:w-[50%] md:w-[50%] p-2 ml-2 flex flex-col gap-1 lg:items-start items-center  lg:justify-items-start  ">
            <div className=" inline-block  text-center  lg:text-left">
              <h1 className="text-[30px] font-bold leading-tight">
                {productDetails.title}
              </h1>
            </div>
            <Separator />

            <div className="flex flex-row gap-3">
              <span className="text-red-600 text-4xl">
                -
                {Math.round(
                  ((productDetails.price - productDetails.salePrice) /
                    productDetails.price) *
                    100
                )}
                %
              </span>
              <span className="text-4xl">₹{productDetails.salePrice}</span>
            </div>
            <span className="text-md font-md mt-2 text-slate-500">
              M.R.P: ₹{productDetails.price}
            </span>
          </div>
        </div>
      ) : (
        <p>No product found</p>
      )}

<div>
      {/* Image upload form */}
      <div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          disabled={uploading} // Disable while uploading
        />
        <Button
        
          onClick={handleImageUpload}
          disabled={uploading || selectedImages.length !== 4} // Disable if not 4 images selected or if uploading
        >
          {uploading ? "Uploading..." : "Upload Images"}
        </Button>
      </div>
      <div>
        {/* Display selected images as thumbnails */}
        {selectedImages.map((image, index) => (
          <img
            key={index}
            src={URL.createObjectURL(image)}
            alt={`Selected Image ${index + 1}`}
            className="w-20 h-20 object-cover rounded"
          />
        ))}
      </div>
    </div>
    </div>

    
  );
}
