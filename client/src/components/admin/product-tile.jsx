import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

export function AdminProductTile({
  product,
  setCurrentEditedId,
  setFormData,
  setCreateProductDialogue,
  handleDelete,
}) {
  const navigate = useNavigate();
  return (
    <Card className="w-full relative flex flex-col justify-between max-w-sm mx-auto">
      <div
        className="relative cursor-pointer"
        onClick={() => {
          navigate(`/admin/product/${product._id}`);
        }}
      >
        <img
          src={product?.image}
          alt={product.title}
          className="w-full h-[300px] object-cover rounded-t-lg"
        />
      </div>
      <CardContent>
        <h2 className="text-xl font-bold mb-2">{product.title}</h2>
        <div className="flex justify-between items-center mb-2">
          <span
            className={`${
              product.salePrice > 0 ? "line-through" : ""
            } text-lg font-semibold text-primary`}
          >
            ₹{product?.price}
          </span>
          <span className="text-lg font-bold">
            {product.salePrice > 0 ? "₹" + product.salePrice : null}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button
          onClick={() => {
            setCreateProductDialogue(true);
            setCurrentEditedId(product?._id);
            setFormData(product);
          }}
        >
          Edit
        </Button>
        <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
      </CardFooter>
      {product.totalStock ==0?<div className="absolute top-0 left-0 bg-red-500 p-1 runded animate-bounce">
        !out of Stock
      </div>:null}
      
      
    </Card>
  );
}
