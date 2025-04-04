import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ImageUpload } from "@/components/admin/imageupload";
import CommonForm from "@/components/common/form";
import { addblogelements } from "@/config/const ";
import { BlogTile } from "@/components/admin/blog-tile";
import { addBlog, deleteBlogs, editBlog, fetchAllBlogs } from "@/store/admin/blogslice";
import { useDispatch, useSelector } from "react-redux";



const initialFormData={
  title:"",
  content:""
}


export const AdminBlogs=()=>{


    const {allBlogs}=useSelector(state=>state.blog)
   
    const dispatch=useDispatch()

  const [createProductDialogue, setCreateProductDialogue] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId,setCurrentEditedId]=useState(null);

  useEffect(()=>{
      dispatch(fetchAllBlogs())
  },[dispatch])

  function onSubmit(e) {
      e.preventDefault();
      currentEditedId !==null ? dispatch(editBlog({id:currentEditedId,
        formData
      })).then(data=>{
        if(data?.payload?.success){
          dispatch(fetchAllBlogs())
          setCreateProductDialogue(false)
          setFormData(initialFormData); 
          setCurrentEditedId(null)
        }
      }):
      dispatch(addBlog({ ...formData, image:uploadedImageUrl })).then(
        (data) => {if(data?.payload.success){
          setImageFile(null);
          setFormData(initialFormData);
          setCreateProductDialogue(false)
          dispatch(fetchAllBlogs()) ;
          toast({
            title:"product added succesfully"
            
          })
          setCreateProductDialogue(false)
        };
        }
      );
    }

    function handleDelete(getCurrentProductId){
        dispatch(deleteBlogs({id:getCurrentProductId}));
        dispatch(fetchAllBlogs())
      }
  


  return(<>
  <div className="flex flex-col">
    <div className="flex flex-row justify-between"><span className="">ENTER NEW BLOGS HERE</span><span onClick={() => {
            setCreateProductDialogue(true);
            setCurrentEditedId(null)
            setFormData(initialFormData)
          }} className="bg-black text-white p-2 rounded-sm text-[14px] font-semibold font-arial cursor-pointer">ADD A NEW BLOG</span></div>
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
              <SheetTitle>{currentEditedId !=null ? 'Edit blog':'Add New blog'}</SheetTitle>
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
                formControls={addblogelements}
              ></CommonForm>
            </div>
          </SheetContent>
        </Sheet>
  
    <div className="grid gap-2 grid-cols-2 md:grid-cols-2 lg:grid-cols-4 ">{allBlogs && allBlogs.length>0 ? allBlogs.map((productItems) => (<BlogTile key={productItems._id} product={productItems} setCurrentEditedId={setCurrentEditedId} setFormData={setFormData} setCreateProductDialogue={setCreateProductDialogue} handleDelete={handleDelete}></BlogTile>)):<span>No blogs addded</span>}
          </div>
   
  </div>
  </>)
}