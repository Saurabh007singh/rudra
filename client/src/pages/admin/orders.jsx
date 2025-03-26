import { Card, CardContent, CardHeader } from "@/components/ui/card";
import moment from "moment-timezone";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import CommonForm from "@/components/common/form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrders,
  getAllOrders,
  getSingleOrders,
  updateStatus,
} from "@/store/shop/order-slice";
import { Loading } from "../loading/loading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowBigDown, FileText, Mail, Phone, Search, Trash } from "lucide-react";
import Papa from "papaparse";

const initialFormData = {
  status: "",
};

export const AdminOrders = () => {
  const dispatch = useDispatch();
  const { singleOrder,isSingleOrderLoading } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);
  const { allOrders, isOrdersLoading } = useSelector((state) => state.orders);
  const [formData, setFormData] = useState(initialFormData);

  const [searched, setSearched] = useState(false);
  const [search, setSearch] = useState("");
  



  useEffect(() => {
    dispatch(getAllOrders(user?.id));
  },[]);


 

  function handleUpdateStatus(event, orderId,formData) {

    event.preventDefault();

    if(searched){
      dispatch(updateStatus({orderId, formData})).then((data)=>{if(data.payload.success){
        dispatch(getSingleOrders(search.trim()))
    }});
  }else{
    dispatch(updateStatus({orderId, formData})).then((data)=>{if(data.payload.success){
      dispatch(getAllOrders(user?.id));
       
      }});
  }
    
   
  }


  function handleDownloadExel(item) {
    let orderData = [];
    orderData = [
      {
        orderId: item._id,
        orderDate: moment(item.orderDate)
          .tz("Asia/Kolkata")
          .format("YYYY-MM-DD HH:mm:ss"),
        orderStatus: item.orderStatus,
        price: item.totalAmount,
        address: item.address.address,
        city: item.address.city,
        state: item.address.state,
        pinCode: item.address.pincode,
        Phone: item.address.phone,
        Email: user.email,
      },
    ];

    const csv = Papa.unparse(orderData);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

    const link = document.createElement("a");
    if (link.download !== undefined) {
      // Create an Object URL for the Blob
      link.href = URL.createObjectURL(blob);
      link.download = `${item._id}_order.csv`; // Set the filename to be the Order ID followed by _order.csv
      document.body.appendChild(link); // Append the link to the document
      link.click(); // Simulate a click to trigger the download
      document.body.removeChild(link); // Clean up by removing the link
    }
  }

  function handleDownloadFullExel(item) {
    let orderData = item.map((item) => ({
      orderId: item._id,
      orderDate: moment(item.orderDate)
        .tz("Asia/Kolkata")
        .format("YYYY-MM-DD HH:mm:ss"),
      orderStatus: item.orderStatus,
      price: item.totalAmount,
      address: item.address.address,
      city: item.address.city,
      state: item.address.state,
      pinCode: item.address.pincode,
      Phone: item.address.phone,
      Email: user.email,
    }));

    const csv = Papa.unparse(orderData);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

    const link = document.createElement("a");
    if (link.download !== undefined) {
      // Create an Object URL for the Blob
      link.href = URL.createObjectURL(blob);
      link.download = `orders.csv`; // Set the filename to be the Order ID followed by _order.csv
      document.body.appendChild(link); // Append the link to the document
      link.click(); // Simulate a click to trigger the download
      document.body.removeChild(link); // Clean up by removing the link
    }
  }

  function handleSearch() {
    if (search !== "") {
      dispatch(getSingleOrders(search.trim())); 
      setSearched(true); 
    }
  }

  function handleOrderDelete(item){
dispatch(deleteOrders(item)).then(()=>{dispatch(getAllOrders(user?.id));setSearched(false)
  setSearch("")})


  }
    
  return (
    <>
    <div className="flex flex-row w-full justify-between mb-5 px-5 ">
            <div className="flex flex-row items-center border-b focus:border-collapse w-[300px] justify-between">
              <input
                type="text"
                placeholder="search by id"
                onChange={(e) => setSearch(e.target.value)}
                className="focus:outline-none w-full"
                value={search}
              />
              <Search
                className="cursor-pointer hover:scale-110 transition duration-200" 
                onClick={() => handleSearch()}
              />
            </div>
           
          </div>

     {<>{!isOrdersLoading || !isSingleOrderLoading ? (
        <>
          
          <Card>
          <CardHeader className="flex flex-row justify-between">
            <div><span>Orders</span></div>
            
            <div
              onClick={() => handleDownloadFullExel(searched? singleOrder:allOrders)}
              className="flex felx-row bg-red-500 rounded h-10 w-50 items-center p-2 cursor-pointer"
            >
              <FileText />
              <span>Download all Orders </span>
            </div></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>OrderID</TableHead>
                    <TableHead>Orde Date</TableHead>
                    <TableHead>Order Status</TableHead>
                    <TableHead>Payment Mode</TableHead>
                    <TableHead>Order Price</TableHead>
                    <TableHead>
                      <span className="sr-only">details</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(searched ? singleOrder:allOrders).slice().map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item._id}</TableCell>
                      <TableCell>
                        {moment(item.orderDate)
                          .tz("Asia/Kolkata")
                          .format("YYYY-MM-DD HH:mm:ss")}
                      </TableCell>
                      <TableCell>{item.orderStatus}</TableCell>
                      <TableCell>{item.paymentMethod}</TableCell>
                      <TableCell>₹{item.totalAmount}</TableCell>

                      <TableCell>
                        <Dialog>
                          <DialogTrigger className="bg-black text-white h-8 w-16 rounded">
                            Details
                          </DialogTrigger>

                          <DialogTitle></DialogTitle>
                          <DialogDescription></DialogDescription>
                          <DialogContent className="sm:max-w-[1200px] ">
                            <ScrollArea className="max-h-[550px]">
                              <div className="grid gap-6 p-4 ">
                                <div className="grid gap-2 ">
                                  <div className="flex mt-6 items-center justify-between">
                                    <p className="font-medium ">Order Id</p>
                                    <Label>{item._id}</Label>
                                  </div>
                                  <div className="flex mt-2 items-center justify-between">
                                    <p className="font-medium ">Order Date</p>
                                    <Label>
                                      {moment(item.orderDate)
                                        .tz("Asia/Kolkata")
                                        .format("YYYY-MM-DD HH:mm:ss")}
                                    </Label>
                                  </div>
                                  <div className="flex mt-2 items-center justify-between">
                                    <p className="font-medium ">Price</p>
                                    <Label>₹{item.totalAmount}</Label>
                                  </div>
                                  <div className="flex mt-2 items-center justify-between">
                                    <p className="font-medium ">Order Status</p>
                                    <Label>{item.orderStatus}</Label>
                                  </div>
                                  <Separator></Separator>
                                  <div className="grid gap-4">
                                    <div className="grid gap-2">
                                      <span className="font-medium">
                                        Order details
                                      </span>
                                      <ul className="grid gap-3">
                                        {item.cartItems.map((cartItem) => (
                                          <li
                                            key={cartItem._id}
                                            className="flex items-center justify-between"
                                          >
                                            <img
                                              src={cartItem.image}
                                              alt="cartItem"
                                              className="h-20 w-20"
                                            />
                                            <span>{cartItem.title}</span>
                                            <span>
                                              price:₹{cartItem.salePrice}x
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
                                  <div>
                                    <CommonForm
                                      formControls={[
                                        {
                                          label: "Order Status",
                                          name: "status",
                                          componentType: "select",
                                          options: [
                                            { id: "received", label: "Received" },
                                            {
                                              id: "inProcess",
                                              label: "In Process",
                                            },
                                            {
                                              id: "inShipping",
                                              label: "In Shipping",
                                            },
                                            {
                                              id: "rejected",
                                              label: "Rejected",
                                            },
                                            {
                                              id: "delivered",
                                              label: "Delivered",
                                            },
                                            {
                                              id: "returned",
                                              label: "Returned",
                                            },
                                          ],
                                        },
                                      ]}
                                      formData={formData}
                                      setFormData={setFormData}
                                      buttonText={"Update Order Status"}
                                      onSubmit={(e) =>
                                        handleUpdateStatus(e,item._id,formData)
                                      }
                                    />
                                  </div>
                                </div>
                                <div
                                  onClick={() => handleDownloadExel(item)}
                                  className="flex flex-row w-full justify-center items-center bg-red-500 h-12 cursor-pointer"
                                >
                                  <FileText />
                                  <span> Download Exel</span>
                                </div>
                              </div>
                            </ScrollArea>
                          </DialogContent>
                        </Dialog>
                      </TableCell>{
                        searched?<TableCell>
                        <Dialog>
                          <DialogTrigger><Trash className="text-red-500"/></DialogTrigger>
                          <DialogTitle></DialogTitle>
                          <DialogDescription></DialogDescription>
                          <DialogContent>
                            <div className=" font-bold flex flex-col items-center justify-center gap-3  "> <span className="text-red-500 motion-safe:animate-ping text-4xl mb-10">Warning!</span>
                            <span className="">You are about to delete an order </span>
                            <span className="">Are you sure you want to delete </span>
                            <span>Click Trash icon to delete</span>
                            <ArrowBigDown className="animate-bounce text-red-500 "></ArrowBigDown>
                            <Trash onClick={()=>handleOrderDelete(item._id)} className="text-red-500"></Trash>
                            </div>
                          
                          </DialogContent>
                        </Dialog>

                        
                       
                      </TableCell>:null
                      }
                      
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      ) : (
        <Loading />
      )}</>
      }
      
    </>
  );
};
