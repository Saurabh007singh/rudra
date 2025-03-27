import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { getUserOrders } from "@/store/shop/order-slice";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../loading/loading";
import moment from "moment-timezone";
import { Mail, Phone } from "lucide-react";
import { addReview } from "@/store/shop/review-slice";

export function Orders() {
  const [rating, setRating] = useState(1); 
  const [reviewText, setReviewText] = useState(""); 
  const [reviewDialog,setReviewDialog]=useState(false)

  const handleRating = (value) => {
    setRating(value);
  };

  // Handle review text change
  const handleReviewTextChange = (e) => {
    setReviewText(e.target.value);
  };







  const { user } = useSelector((state) => state.auth);
  const { userOrders, isUSerOrdersLoading } = useSelector(
    (state) => state.orders
  );
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getUserOrders(user?.id));
  }, [dispatch]);



  function handleSubmitReview(productId,userId){

    dispatch(addReview({productId,userId,rating,reviewText})).then(()=>{setReviewDialog(false)})
  }

  function ShowStatus({ status }) {
    const getStepClass = (step) => {
      switch (step) {
        case "received":
          return status === "received" ||
            status === "inShipping" ||
            status === "delivered"
            ? "bg-green-500 text-white"
            : "bg-gray-300 text-gray-700";
        case "inShipping":
          return status === "inShipping" || status === "delivered"
            ? "bg-green-500 text-white"
            : "bg-gray-300 text-gray-700";
        case "delivered":
          return status === "delivered"
            ? "bg-green-500 text-white"
            : "bg-gray-300 text-gray-700";
        default:
          return "bg-gray-300 text-gray-700";
      }
    };

    return (
      <div className="flex items-center justify-between p-4">
        {/* Received Step */}
        <div
          className={`flex flex-col items-center ${
            status === "received" ||
            status === "inShipping" ||
            status === "delivered"
              ? "text-green-500"
              : "text-gray-500"
          }`}
        >
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full animate-pulse ${getStepClass(
              "received"
            )}`}
          >
            {status === "received" ||
            status === "inShipping" ||
            status === "delivered" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            )}
          </div>
          <span className="mt-2 text-xs">Received</span>
        </div>

        {/* Progress Line */}
        <div
          className={`flex-1 mt-[-20px] h-1 ${
            status === "inShipping" || status === "delivered"
              ? "bg-green-500"
              : "bg-gray-300"
          } mx-2 `}
        ></div>

        {/* Shipped Step */}
        <div
          className={`flex flex-col items-center animate-pulse ${
            status === "inShipping" || status === "delivered"
              ? "text-green-500"
              : "text-gray-500"
          }`}
        >
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full ${getStepClass(
              "inShipping"
            )}`}
          >
            {status === "inShipping" || status === "delivered" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12h18M3 6h18M3 18h18"
                />
              </svg>
            ) : (
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            )}
          </div>
          <span className="mt-2 text-xs">Shipped</span>
        </div>

        {/* Progress Line */}
        <div
          className={`flex-1 h-1 mt-[-20px] ${
            status === "delivered" ? "bg-green-500" : "bg-gray-300"
          } mx-2`}
        ></div>

        {/* Delivered Step */}
        <div
          className={`flex flex-col items-center animate-pulse ${
            status === "delivered" ? "text-green-500" : "text-gray-500"
          }`}
        >
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full ${getStepClass(
              "delivered"
            )}`}
          >
            {status === "delivered" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            )}
          </div>
          <span className="mt-2 text-xs">Delivered</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {!isUSerOrdersLoading ? (
        <Card className="overflow-hidden sm:overflow-visible">
          <CardHeader>Order History</CardHeader>
          <CardContent>
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>OrderID</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Order Status</TableHead>
                  <TableHead>Order Price</TableHead>
                  <TableHead>
                    <span className="sr-only">Details</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userOrders
                  .slice()
                  .reverse()
                  .map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item._id}</TableCell>
                      <TableCell>
                        {moment(item.orderDate)
                          .tz("Asia/Kolkata")
                          .format("YYYY-MM-DD HH:mm:ss")}
                      </TableCell>
                      <TableCell>{item.orderStatus}</TableCell>
                      <TableCell>₹{item.totalAmount}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger className="bg-black text-white h-8 w-16 rounded">
                            Details
                          </DialogTrigger>
                          <DialogTitle></DialogTitle>
                          <DialogDescription></DialogDescription>

                          <DialogContent className="sm:max-w-[1200px]">
                            <ScrollArea className="max-h-[550px]">
                              <div>
                                <ShowStatus status={item.orderStatus} />
                              </div>
                              <div className="grid gap-6 p-4">
                                <div className="grid gap-2">
                                  <div className="flex mt-6 items-center justify-between">
                                    <p className="font-medium">Order Id</p>
                                    <Label>{item._id}</Label>
                                  </div>
                                  <div className="flex mt-2 items-center justify-between">
                                    <p className="font-medium">Order Date</p>
                                    <Label>
                                      {moment(item.orderDate)
                                        .tz("Asia/Kolkata")
                                        .format("YYYY-MM-DD HH:mm:ss")}
                                    </Label>
                                  </div>
                                  <div className="flex mt-2 items-center justify-between">
                                    <p className="font-medium">Price</p>
                                    <Label>₹{item.totalAmount}</Label>
                                  </div>
                                  <div className="flex mt-2 items-center justify-between">
                                    <p className="font-medium">Order Status</p>
                                    <Label>{item.orderStatus}</Label>
                                  </div>
                                  <Separator />
                                  <div className="grid gap-4">
                                    <div className="grid gap-2">
                                      <span className="font-medium">
                                        Order details
                                      </span>
                                      <ul>
                                        {item.cartItems.map((cartItem) => (
                                          <li
                                            key={cartItem._id}
                                            className="flex flex-col gap-4 sm:flex-col lg:flex-row md:flex-row items-center justify-between"
                                          >
                                            <img
                                              src={cartItem.image}
                                              alt="cartItem"
                                              className="h-20 w-20 mb-4 sm:mb-0"
                                            />
                                            <div className=" bg-red-300 lg:w-[300px] md:w-[250px]  sm:w-[200px] sm:ml-4 text-center">
                                              <span className="">
                                                {cartItem.title}
                                              </span>
                                            </div>
                                            {item.orderStatus ===
                                              "delivered" && (
                                              <Dialog open={reviewDialog} onOpenChange={setReviewDialog}>
                                                <DialogTrigger>
                                                  <span className="bg-[#786B4A] p-2 lg:w-[200px] text-white rounded-sm">
                                                    Review this product
                                                  </span>
                                                </DialogTrigger>
                                                <DialogTitle></DialogTitle>
                                                <DialogDescription></DialogDescription>
                                                <DialogContent>
                                                  <div className="flex items-center justify-center">
                                                    <div className="space-y-4 w-full">
                                                      <div className="text-center">
                                                        <span className="font-medium text-lg">
                                                          Add a review to this
                                                          product
                                                        </span>
                                                      </div>

                                                      {/* Rating Section */}
                                                      <div className="flex justify-center items-center space-x-2">
                                                        <span className="font-medium">
                                                          Rating:
                                                        </span>
                                                        <div className="flex space-x-1">
                                                          {[1, 2, 3, 4, 5].map(
                                                            (star) => (
                                                              <span
                                                                key={star}
                                                                className={`text-2xl cursor-pointer ${
                                                                  star <= rating
                                                                    ? "text-[#786B4A]"
                                                                    : "text-gray-400"
                                                                }`}
                                                                onClick={() =>
                                                                  handleRating(
                                                                    star
                                                                  )
                                                                }
                                                              >
                                                                ★
                                                              </span>
                                                            )
                                                          )}
                                                        </div>
                                                      </div>

                                                      {/* Review Text Section */}
                                                      <div>
                                                        <label
                                                          htmlFor="review"
                                                          className="block text-sm font-medium"
                                                        >
                                                          Your Review:
                                                        </label>
                                                        <textarea
                                                          id="review"
                                                          value={reviewText}
                                                          onChange={
                                                            handleReviewTextChange
                                                          }
                                                          placeholder="Write your review here..."
                                                          className="mt-2 p-2 w-full h-24 border rounded-md resize-none"
                                                        />
                                                      </div>

                                                  
                                                      <div className="flex justify-center mt-4">
                                                        {reviewText.trim()!=""?<button
                                                          className="bg-[#786B4A] text-white p-2 px-4 rounded-sm"
                                                          onClick={() => {
                                                            handleSubmitReview(cartItem.productId,user.id);
                                                    
                                                            setReviewText("");
                                                            
                                                          }}
                                                        >
                                                          Submit Review
                                                        </button>:<button onClick={()=>{alert("please enter a review")}} className="bg-[#786B4A] text-white p-2 px-4 rounded-sm">Submit Review</button>}
                                                        
                                                      </div>
                                                    </div>
                                                  </div>
                                                </DialogContent>
                                              </Dialog>
                                            )}
                                            <span>
                                              price: ₹{cartItem.salePrice} x{" "}
                                              {cartItem.quantity}
                                            </span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="grid gap-4">
                                    <div className="grid gap-2">
                                      <div className="font-medium">
                                        Shipping info
                                      </div>
                                      <div className="flex flex-col gap-2 mx-2 p-2 mb-2 bg-white shadow-xl rounded-lg">
                                        <span className="text-sm md:text-base">
                                          {item.address.address}
                                        </span>
                                        <div className="flex flex-row gap-1">
                                          <span className="text-sm md:text-base">
                                            {item.address.city}
                                          </span>
                                          ,
                                          <span className="text-sm md:text-base">
                                            {item.address.state}
                                          </span>
                                          ,
                                          <span className="font-semibold text-sm md:text-base">
                                            {item.address.pinCode}
                                          </span>
                                        </div>
                                        <div className="flex flex-row gap-2">
                                          <Phone className="h-5" />
                                          <span className="text-sm md:text-base">
                                            {item.address.phone}
                                          </span>
                                          <Mail className="h-5" />
                                          <span className="text-sm md:text-base">
                                            {user.email}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </ScrollArea>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Loading />
      )}
    </>
  );
}
