import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import CommonForm from "@/components/common/form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "@/store/shop/order-slice";
import { Loading } from "../loading/loading";

const initialFormData = {
  status: "",
};


export const AdminOrders = () => {
  
const {user}=useSelector(state=>state.auth)


const {allOrders,isOrdersLoading}=useSelector(state=>state.orders)
const dispatch=useDispatch()

console.log(allOrders)

useEffect(()=>{
  dispatch(getAllOrders(user?.id))
},[dispatch])

  const [formData, setFormData] = useState(initialFormData);

  function handleUpdateStatus(event){
event.preventDefault();
  }

  return (<>{
      !isOrdersLoading ?<Card>
      <CardHeader>OrderHistory</CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>OrderID</TableHead>
              <TableHead>Orde Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allOrders.map(item=><TableRow key={item._id}>
              <TableCell>{item._id}</TableCell>
              <TableCell>124241</TableCell>
              <TableCell>124241</TableCell>
              <TableCell>124241</TableCell>

              <TableCell>
                <Dialog>
                  <DialogTrigger className="bg-black text-white h-8 w-16 rounded">
                    Details
                  </DialogTrigger>
                  <DialogTitle></DialogTitle>
                  <DialogDescription></DialogDescription>
                  <DialogContent className="sm:max-w-[600px]">
                    <div className="grid gap-6">
                      <div className="grid gap-2">
                        <div className="flex mt-6 items-center justify-between">
                          <p className="font-medium ">Order Id</p>
                          <Label>{123456}</Label>
                        </div>
                        <div className="flex mt-2 items-center justify-between">
                          <p className="font-medium ">Order Date</p>
                          <Label>123456</Label>
                        </div>
                        <div className="flex mt-2 items-center justify-between">
                          <p className="font-medium ">Price</p>
                          <Label>300</Label>
                        </div>
                        <div className="flex mt-2 items-center justify-between">
                          <p className="font-medium ">Order Status</p>
                          <Label>in process</Label>
                        </div>
                        <Separator></Separator>
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <div className="font-medium">Order details</div>
                            <ul className="grid gap-3">
                              <li className="flex items-center justify-between">
                                <span>Product One</span>
                                <span>100</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <div className="font-medium">Shipping info</div>
                            <div className="grid gap-0.5 text-muted-foreground">
                              <span>jhon Doe</span>
                              <span>Address</span>
                              <span>City</span>
                              <span>Phone</span>
                              <span>notes</span>
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
                                  { id: "pending", label: "Pending" },
                                  { id: "inProcess", label: "In Process" },
                                  { id: "inShipping", label: "In Shipping" },
                                  { id: "rejected", label: "Rejected" },
                                  { id: "delivered", label: "Delivered" },
                                  { id: "returned", label: "Returned" },
                                ],
                              },
                            ]}
                            formData={formData}
                            setFormData={setFormData}
                            buttonText={"Update Order Status"}
                            onSubmit={handleUpdateStatus}
                          />
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>)}
            
          </TableBody>
        </Table>
      </CardContent>
    </Card>:<Loading/>
    }</>
    
    
  );
};
