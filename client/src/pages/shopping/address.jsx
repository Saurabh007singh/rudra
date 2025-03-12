import CommonForm from "@/components/common/form";
import { Card, CardHeader, CardTitle,CardContent } from "@/components/ui/card";
import { addressFormControls } from "@/config/const ";
import { addNewAddress, deleteAddress, editAddress, getAllAddress } from "@/store/shop/address-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddressCard } from "./addresscard";
import { useToast } from "@/hooks/use-toast";

const initialAddressFormData={
address:"",
city:"",
phone:"",
pincode:"",
notes:"",
}

export function Address(){
const [formData,setFormData]=useState(initialAddressFormData);
const dispatch=useDispatch()
const {user}=useSelector(state=>state.auth)
const {addressList}=useSelector(state=>state.address)
const [currentEditedId,setCurrentEditedId]=useState(null)
const {toast}=useToast()


function handleManageAddress(event){
  event.preventDefault()

  if(addressList.length >= 3 && currentEditedId === null){
    toast({title:"you can only add upto three addresses",
      variant:'destructive'
      
    })
    setFormData(initialAddressFormData)
    return;
  }

  currentEditedId !==null?dispatch(editAddress({userId:user.id,addressId:currentEditedId,formData})).then((data)=>{if(data.payload.success){
    dispatch(getAllAddress(user.id));
    setCurrentEditedId(null);
    setFormData(initialAddressFormData)
    toast({title:"address edited successfully"})
  }}):

  dispatch(addNewAddress({
    ...formData,
    userId:user?.id
  })).then(data=>{if(data.payload.success){
    dispatch(getAllAddress(user.id));
    setFormData(initialAddressFormData);
    toast({title:"Address added successfully"})
  }})
}

function handleDeleteAddress(getCurrentAddress){

dispatch(deleteAddress({userId:user.id,addressId:getCurrentAddress._id})).then((data)=>{
  if(data.payload.success){
      dispatch(getAllAddress(user?.id))
}}
  )
}

function handleEditAddress(getCurrentAddress){
  setCurrentEditedId(getCurrentAddress?._id)
setFormData({
  ...formData,
  address:getCurrentAddress?.address,
  city:getCurrentAddress?.city,
  phone:getCurrentAddress?.phone,
  pincode:getCurrentAddress?.pincode,
  notes:getCurrentAddress?.notes,
})
}


useEffect(()=>{
  dispatch(getAllAddress(user.id))
},[])

  return(
    <Card className="w-full">
      <div className="mb-5 p-3  grid grid-cols-1 sm:grid-cols-2 md-grid-cols-3 lg:grid-cols-3 gap-2 ">
         {addressList && addressList.length>0 ? addressList.map((item)=>(<AddressCard handleDeleteAddress={handleDeleteAddress} handleEditAddress={handleEditAddress}
         addressInfo={item} key={Math.random()}></AddressCard>)):null}
      </div>
  <CardHeader>
    <CardTitle>{currentEditedId !==null ? "Edit Address":"Add New Address"}</CardTitle>
  </CardHeader>
  <CardContent className="" >
    <CommonForm 
      formControls={addressFormControls}
      formData={formData}
      setFormData={setFormData}
      buttonText={currentEditedId !==null ? "Edit Address":"Add"}
      onSubmit={handleManageAddress}
      // Fix the onSubmit callback
    />
  </CardContent>
</Card>

  )
  }