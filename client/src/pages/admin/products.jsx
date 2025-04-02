import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "../../config/const ";
import { Fragment, useEffect, useState } from "react";
import { ImageUpload } from "@/components/admin/imageupload";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/store/admin/product-slice";
import { useToast } from "@/hooks/use-toast";
import { AdminProductTile } from "@/components/admin/product-tile";
import { FileText } from "lucide-react";
import Papa from "papaparse";


const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  TotalStock: "",
  starProduct:"",
};

export const AdminProducts = () => {

const [currentPage,setCurrentPage]=useState(1);
const [totalPages,setTotalPages]=useState(1);
const [itemsPerPage,setItemsPerPage]=useState(12)


  const [createProductDialogue, setCreateProductDialogue] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId,setCurrentEditedId]=useState(null);


  const { productList } = useSelector((state) => state.adminProducts);
  const {toast}=useToast();
  const dispatch = useDispatch();

  

  useEffect(() => {
    dispatch(fetchAllProducts({page:currentPage,limit:itemsPerPage})).then(data=>{console.log(data);
      setTotalPages(data.payload.pagination.totalPages)
    });
  }, [dispatch,currentPage,itemsPerPage]);

  function onSubmit(e) {
    e.preventDefault();
    currentEditedId !==null ? dispatch(editProduct({id:currentEditedId,
      formData
    })).then(data=>{
      if(data?.payload?.success){
        dispatch(fetchAllProducts({page:currentPage,limit:itemsPerPage}))
        setCreateProductDialogue(false)
        setFormData(initialFormData); 
        setCurrentEditedId(null)
      }
    }):
    dispatch(addNewProduct({ ...formData, image: uploadedImageUrl })).then(
      (data) => {if(data?.payload.success){
        setImageFile(null);
        setFormData(initialFormData);
        setCreateProductDialogue(false)
        dispatch(fetchAllProducts()) ;
        toast({
          title:"product added succesfully"
          
        })
        setCreateProductDialogue(false)
      };
      }
    );
  }

  function handleDelete(getCurrentProductId){
    dispatch(deleteProduct({id:getCurrentProductId}));
    dispatch(fetchAllProducts({page:currentPage,limit:itemsPerPage}))
  }

  function handleDownloadFullExel() {
    let item
    dispatch(fetchAllProducts({page:1,limit:500})).then(data=>item =data.payload.data).then(()=>{
      let productsData = item.map((item) => ({
        productId: item._id,
        category:item.category,
        description: item.description,
        price: item.price,
        productCode: item.productCode,
        salePrice: item.salePrice,
        size: item.size,
        totalStock: item.totalStock,
        brand:item.brand
      }));
  
      const csv = Papa.unparse(productsData);
  
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  
      const link = document.createElement("a");
      if (link.download !== undefined) {
        // Create an Object URL for the Blob
        link.href = URL.createObjectURL(blob);
        link.download = `orders.csv`; // Set the filename to be the Order ID followed by _order.csv
        document.body.appendChild(link); // Append the link to the document
        link.click(); // Simulate a click to trigger the download
        document.body.removeChild(link); // Clean up by removing the link
      }})
    
    }

  const handlePrevPage=()=>{
    if(currentPage>1){
      setCurrentPage(currentPage-1)
    }
  }

  const handleNextPage=()=>{
    if(currentPage<totalPages){
      setCurrentPage(currentPage+1)
    }
  }
  

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-between ">
      <div
              onClick={() => handleDownloadFullExel()}
              className="flex felx-row bg-red-500 rounded h-10 w-50 items-center p-2 cursor-pointer"
            >
              <FileText />
              <span>Download product Details </span>
            </div>
        <Button
          onClick={() => {
            setCreateProductDialogue(true);
            setCurrentEditedId(null)
            setFormData(initialFormData)
          }}
        >
          Add new Product
        </Button>
        
      </div>
      <div className="grid gap-2 md:grid-cols-4 lg-grid-cols-4 ">{productList && productList.length>0 ? productList.map((productItems) => (<AdminProductTile key={productItems._id} product={productItems} setCurrentEditedId={setCurrentEditedId} setFormData={setFormData} setCreateProductDialogue={setCreateProductDialogue} handleDelete={handleDelete}></AdminProductTile>)):<span>No products addded</span>}
      </div>
      <div className="flex justify-between items-center mt-5">
      <Button disabled={currentPage === 1} onClick={handlePrevPage}>
        Previous
      </Button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button disabled={currentPage === totalPages} onClick={handleNextPage}>
        Next
      </Button>
    </div>

        <Sheet
          open={createProductDialogue}
          onOpenChange={() => {
            setCreateProductDialogue(false);
            setCurrentEditedId(null);
            setFormData(initialFormData)
          }}
        >
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader className="text-lg font-semibold ">
              <SheetTitle>{currentEditedId !=null ? 'Edit Product':'Add New Product'}</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>

            <ImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              imageLoadingState={imageLoadingState}
              setImageLoadingState={setImageLoadingState}
              isEditMode={currentEditedId !==null}
            />
            <div className="py-6">
              <CommonForm
                buttonText={currentEditedId !==null ? "EDIT":"ADD"}
                onSubmit={onSubmit}
                formData={formData}
                setFormData={setFormData}
                formControls={addProductFormElements}
              ></CommonForm>
            </div>
          </SheetContent>
        </Sheet>
      
    </Fragment>
  );
};
