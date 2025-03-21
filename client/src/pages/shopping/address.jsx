import CommonForm from "@/components/common/form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { addressFormControls } from "@/config/const ";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  getAllAddress,
} from "@/store/shop/address-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddressCard } from "./addresscard";
import { useToast } from "@/hooks/use-toast";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  state:"",
  landmark: "",
};

export function Address() {
  const [formData, setFormData] = useState(initialAddressFormData);
  // Track selected address
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.address);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { toast } = useToast();
  const [selectedAddress, setSelectedAddress] = useState(addressList[0]);

 

  function handleManageAddress(event) {
    event.preventDefault();

    if (addressList.length >= 1 && currentEditedId === null) {
      toast({
        title: "You can only add up to one address for now",
        variant: "destructive",
      });
      setFormData(initialAddressFormData);
      return;
    }

    currentEditedId !== null
      ? dispatch(
          editAddress({ userId: user.id, addressId: currentEditedId, formData })
        ).then((data) => {
          if (data.payload.success) {
            dispatch(getAllAddress(user.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast({ title: "Address edited successfully" });
          }
        })
      : dispatch(addNewAddress({ ...formData, userId: user?.id })).then(
          (data) => {
            if (data.payload.success) {
              dispatch(getAllAddress(user.id));
              setFormData(initialAddressFormData);
              toast({ title: "Address added successfully" });
            }
          }
        );
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data.payload.success) {
        dispatch(getAllAddress(user?.id));
      }
    });
  }

  function handleEditAddress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    });
  }

  // Handle address selection
  function handleSelectAddress(address) {
    if (selectedAddress?._id === address._id) {
      setSelectedAddress(null); // Deselect if the same address is clicked
    } else {
      setSelectedAddress(address); // Select the clicked address
    }
  }



  return (
    <Card className="w-full">
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((item) => (
              <AddressCard
                key={item._id}
                addressInfo={item}
                handleDeleteAddress={handleDeleteAddress}
                handleEditAddress={handleEditAddress}
                isSelected={selectedAddress?._id === item._id} // Pass isSelected to address card
                onSelect={() => handleSelectAddress(item)} // Select address when clicked
              />
            ))
          : null}
      </div>

      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Edit Address" : "Add"}
          onSubmit={handleManageAddress}
        />
      </CardContent>
    </Card>
  );
}
