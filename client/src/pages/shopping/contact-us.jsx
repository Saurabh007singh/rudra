import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

export function ContactUs() {
  return (
    <div><div className="flex flex-col lg:flex-row bg-gradient-to-r from-white  to-[#D2C3B2] ">
      <div className="flex lg:w-1/2 w-full h-auto flex-row">
        <div className=" w-full bg-[#FFFFFF]">
          <div className="flex flex-col p-10">
            <span className="lg:mt-40 text-6xl text-[#B39D6F] font-serif">
              Contact Us
            </span>
            <span className="mt-4 lg:mr-10">
              We would love to hear from you and we value your feedback. To let
              us know how we can improve your shopping experience, or to ask a
              specific question about your order. Find our contact information
              below.
            </span>
            <div className="flex-col flex gap-2">
              <div className="flex flex-col ">
                <div className="flex flex-row items-center mt-4 ">
                  <FaWhatsapp className="h-6 w-6 text-[#B39D6F]" />
                  <span className="font-serif text-2xl text-[#B39D6F] ">
                    Whatsapp
                  </span>
                </div>
                <span>+91 9999999999</span>
              </div>
              <div className="flex flex-col ">
                <div className="flex flex-row items-center mt-4 ">
                  <MdOutlineMailOutline className="h-6 w-6 text-[#B39D6F]" />
                  <span className="font-serif text-2xl text-[#B39D6F] ">
                    Email Us
                  </span>
                </div>
                <span>www.random@gmail.com</span>
              </div>
              <div className="flex flex-col ">
                <div className="flex flex-row items-center mt-4 ">
                  <FaLocationDot  className="h-6 w-6 text-[#B39D6F]" />
                  <span className="font-serif text-2xl text-[#B39D6F] ">
                    Location
                  </span>
                </div>
                <span className="font-semibold mt-2 ">Registred Office Address</span>
                <span className="lg:mr-10">New Leaf Retail Technologies Private Limited 8, Dr.Sarat Banerjee Road, Meera Building, 3rd Floor, Kolkata - 700029.</span>
                <span className="font-semibold  mt-5">Corporate Office Address</span>
                <span className="lg:mr-10">New Leaf Retail Technologies Private Limited 8, Dr.Sarat Banerjee Road, Meera Building, 3rd Floor, Kolkata - 700029.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" lg:w-1/2 w-full p-8 lg:mt-40 bg-white">
        <div className="w-full h-full shadow-lg lg:p-20 flex flex-col items-center gap-4">
      <span className="text-2xl font-semibold font-serif">WRITE TO US</span>
      <input type="text" placeholder=" Enter Full Name" className="w-full border h-12 rounded-sm shadow placeholder:text-center placeholder:text-[16px]" />
      <input type="text" placeholder=" Enter Your Phone No" className="w-full border h-12 rounded-sm shadow placeholder:text-center placeholder:text-[16px]" />
      <input type="text" placeholder=" Enter Email" className="w-full border h-12 rounded-sm shadow placeholder:text-center placeholder:text-[16px]" />
      <textarea name="sds" id="" className="w-full border h-40 shadow-lg"></textarea>
      <button className="w-full h-12 bg-[#B39D6F] shadow-lg">Submit</button>
      
        </div>
      </div>
      
    </div>
    <div>
  <h1>Our Location</h1>
  <div style={{ width: '100%', height: '500px' }}>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224568.90642784548!2d76.9900807!3d28.422601099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5fe8e5c64b1e!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1744029877556!5m2!1sen!2sin"
      width="100%"
      height="450"
      loading="lazy"
      style={{ border: 0 }}
    ></iframe>
  </div>
</div></div>
    
    
  );
}
