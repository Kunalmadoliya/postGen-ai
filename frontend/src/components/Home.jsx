import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {Upload} from "lucide-react";
import axios from "axios";

const Home = () => {
  const {register, handleSubmit, watch} = useForm();

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [caption, setCaptions] = useState("");
  const fileImage = watch("image");
  useEffect(() => {
    if (fileImage && fileImage[0]) {
      setPreview(URL.createObjectURL(fileImage[0]));
    }
  }, [fileImage]);

  const onSubmit = async (data) => {
    if (!data.image || !data.image[0]) {
      alert("Please Upload the Image First!!!");
      return;
    }

    const formData = new FormData();
    formData.append("image", data.image[0]);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/api/post", formData, {
        headers: {"Content-Type": "multipart/form-data"},
      });

      setCaptions(res.data?.caption || "❌ Failed to generate caption.");
    } catch (err) {
      console.error(err);
      setCaptions("❌ Failed to generate caption.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      {/* Heading */}
      <div className="text-center py-5">
        <h1 className="font-bold text-3xl md:text-5xl">
          Generate Product Captions
        </h1>
        <p className="text-gray-600 mt-3">
          Upload an image and get AI-generated captions.
        </p>
      </div>

      {/* Upload & Caption Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-8">
        {/* Upload Box */}
        <div className="border rounded-lg p-5 w-80 md:w-96">
          <h2 className="font-medium mb-3">Upload Image</h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border-dashed border-2 h-80 rounded-xl flex flex-col items-center justify-center p-4"
          >
            {/* File input */}
            <input
              type="file"
              accept="image/png, image/jpeg, image/webp"
              className="hidden"
              id="fileInput"
              {...register("image")}
            />

            {/* Preview or Upload button */}
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="max-h-64 object-contain"
              />
            ) : (
              <label
                htmlFor="fileInput"
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <div className="bg-green-100 p-4 rounded-full">
                  <Upload className="w-8 h-8 text-green-600" />
                </div>
                <p className="font-medium">Click to browse image</p>
                <p className="text-sm text-gray-500">
                  JPG, PNG, WebP up to 10MB
                </p>
              </label>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Caption"}
            </button>
          </form>
        </div>

        {/* Caption Box */}
        <div className="border rounded-lg p-5 w-80 md:w-96">
          <h2 className="font-medium mb-3">Generated Caption</h2>
          <p className="text-gray-600 mt-3">
            {caption || "(Your AI-generated caption will appear here)"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
