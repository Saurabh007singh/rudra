import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

export function BlogTile({
  product,
  setCurrentEditedId,
  setFormData,
  setCreateProductDialogue,
  handleDelete,
}) {
 
  return (
    <Card className="w-[300px] relative flex flex-col border-4 justify-between max-w-sm mx-auto">
      <div
        className="relative cursor-pointer "
       
      >
        <img
          src={product?.image}
          alt={product.title}
          className="w-full h-[250px] object-fit rounded-t-lg"
        />
      </div>
      <CardContent>
        <h2 className="text-xl font-bold mb-2">{product.title}</h2>
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
      
    </Card>
  );
}
