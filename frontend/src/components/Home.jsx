import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Home = () => {
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const imageFile = watch("image")?.[0];


  useEffect(() => {
    if (imageFile) setPreview(URL.createObjectURL(imageFile));
  }, [imageFile]);

  const onSubmit = async (data) => {
    if (!data.image?.[0]) return;

    const formData = new FormData();
    formData.append("image", data.image[0]);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/api/post", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

     
      setCaption(res.data?.caption || "❌ Failed to generate caption. Try again.");
    } catch (err) {
      console.error(err);
      setCaption("❌ Failed to generate caption. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
  
      <div className="text-center py-5 px-10 md:px-40">
        <h1 className="font-bold text-3xl md:text-5xl">
          Generate Professional Product Captions
        </h1>
        <p className="font-medium text-base md:text-xl py-5">
          Upload your product images and get AI-generated captions perfect for
          e-commerce and social media.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10 p-10">
      
        <div className="border rounded-md p-5 w-80 md:w-96">
          <div className="flex gap-2 items-center mb-3">
            <i className="ri-upload-2-line"></i>
            <p>Upload Image</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="border-dotted border h-80 rounded-2xl flex flex-col items-center justify-center p-4">
            <input
              type="file"
              accept="image/png, image/jpeg, image/webp"
              className="hidden"
              id="fileInput"
              {...register("image", { required: "Image is required" })}
            />

            {preview ? (
              <img src={preview} alt="Preview" className="max-h-72 object-contain" />
            ) : (
              <label htmlFor="fileInput" className="flex flex-col items-center gap-2 cursor-pointer">
                <div className="bg-green-50 p-4 rounded-full">
                  <Upload className="w-8 h-8 text-green-500" />
                </div>
                <p className="font-medium">
                  Drop your image here or <span className="text-blue-600">click to browse</span>
                </p>
                <p className="text-sm text-gray-500">Supports JPG, PNG, WebP up to 10MB</p>
              </label>
            )}

            {errors.image && <p className="text-red-500 text-sm mt-2">{errors.image.message}</p>}

            <button
              type="submit"
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Caption"}
            </button>
          </form>
        </div>

       
        <div className="border rounded-md p-5 w-80 md:w-96">
          <div className="flex gap-2 items-center mb-3">
            <i className="ri-gemini-line"></i>
            <p>Generated Caption</p>
          </div>
          <p className="text-gray-500 mt-3">
            {caption || "(AI-generated caption will appear here)"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
