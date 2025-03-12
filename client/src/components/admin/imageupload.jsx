import { Label } from "@radix-ui/react-label";
import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

export function ImageUpload({
  imageFile,
  setImageFile,
  setUploadedImageUrl,
  setImageLoadingState,
  imageLoadingState,
  isEditMode,
}) {
  const inputRef = useRef();

  function imageFileChange(e) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }
  function handleDrop(e) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }
  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    try {
      setImageLoadingState(true);
      const data = new FormData();
      data.append("my-file", imageFile);

      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image",
        data
      );

      if (response?.data?.success)
        setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }
  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-md font-semibold mb-2 block mt-4 border-t-2">
        Upload image
      </Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className=" border-2 border-dashed rounded-lg p-4"
      >
        <Input
          onChange={imageFileChange}
          ref={inputRef}
          disabled={isEditMode}
          type="file"
          id="image-upload" 
          className="hidden"
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={` ${isEditMode ? 'cursor-not-allowed':''} flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 text-muted-foreground mb-2" />
            <span> Drag nd drop or click to upload</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="bg-gray-200 h-10" />
        ) : (
          <div className="flex items-center justify-between ">
            <div className="Flex items-center">
              <FileIcon className="w-8 text-primary mr-2 "></FileIcon>
            </div>
            <p className="text-sm font-md">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4">
                <span className="sr-only">Remove File</span>
              </XIcon>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
