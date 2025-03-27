import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable"; // Importing react-swipeable

const ImageSlider = () => {
  const images = [
    { url: "/images/banner1.avif" },
    { url: "/images/banner2.avif" },
  ];

  const mobileImages = [
    { url: "/images/mobilebanner1.avif" },
    { url: "/images/mobilebanner2.avif" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Automatically adjust the image based on screen size
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  // Set up the auto slide functionality
  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Automatically change the image every 3 seconds
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (isMobile ? mobileImages.length : images.length));
    }, 3000); // Adjust this interval as needed (3000ms = 3 seconds)

    // Clean up the event listener and interval on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(intervalId);
    };
  }, [isMobile]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (isMobile ? mobileImages.length : images.length));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? (isMobile ? mobileImages.length : images.length) - 1 : prevIndex - 1));
  };

  // Swipeable handler to detect swipes on mobile
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext, // Move to next image when swiped left
    onSwipedRight: handlePrev, // Move to previous image when swiped right
  });

  return (
    <div className="relative overflow-hidden" {...swipeHandlers}>
      {/* Image Slider Wrapper */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {/* Loop through images and display them based on screen size */}
        {(isMobile ? mobileImages : images).map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full" // Ensure each image takes up the full width
          >
            <img
              src={image.url}
              alt="Slider"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Next/Previous buttons (only visible on md and up) */}
      <div className="absolute top-1/2 transform -translate-y-1/2 w-full">
        <button
          onClick={handlePrev}
          className="hidden md:block absolute lg:left-2 left-2 sm:left-8 md:left-10 text-white text-2xl bg-gray-500 p-2 opacity-30 hover:opacity-100"
        >
          <ArrowLeft />
        </button>
        <button
          onClick={handleNext}
          className="hidden md:block absolute right-2 lg:right-2 sm:right-8 md:right-10 text-white text-2xl bg-gray-500 p-2 opacity-30 hover:opacity-100"
        >
          <ArrowRight />
        </button>
      </div>

      {/* Image Indicator (Positioned below the image) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {(isMobile ? mobileImages : images).map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-white" : "bg-gray-500"}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
