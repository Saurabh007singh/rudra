
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function AddressCard({
  addressInfo,
  handleEditAddress,
  handleDeleteAddress,
  isSelected,
  onSelect, // New onSelect handler
}) {
  return (
    <Card
      className={`flex flex-col justify-between  ${isSelected ? "bg-slate-500" : "border-gray-300"}`} // Highlight selected address
      onClick={onSelect} // Add onClick event to select address
    >
      <CardContent className="grid p-4 gap-2">
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>PinCode: {addressInfo?.pinCode}</Label>
        <Label>State:{addressInfo?.state}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Landmark: {addressInfo?.landmark}</Label>
      </CardContent>
      <CardFooter className="flex justify-between p-3">
        <button className="text-md w-[44%] h-12 bg-[#786B4A] text-white" onClick={() => handleEditAddress(addressInfo)}>
          Edit
        </button>
        <button className="text-md w-[44%] h-12 bg-[#786B4A] text-white" onClick={() => handleDeleteAddress(addressInfo)}>
          Delete
        </button>
      </CardFooter>
    </Card>
  );
}
