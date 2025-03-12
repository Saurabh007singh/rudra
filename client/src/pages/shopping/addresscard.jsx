import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function AddressCard({addressInfo,handleEditAddress,handleDeleteAddress}){
  return(
    <Card className="flex flex-col justify-between">
      <CardContent className="grid p-4 gap-2">
        <Label>Address:{addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>PinCode: {addressInfo?.pincode}</Label>
        <Label>Phone:{addressInfo?.phone}</Label>
        <Label>Delivery Instructions: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="flex justify-between p-3">
        <Button onClick={()=>handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={()=>handleDeleteAddress(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  )
}