import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { buildApiUrl, GODSEYE_API_BASE_URL } from "../../config/api";

const InputForm = () => {
  const [video, setVideo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitError("");
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const { data: results } = await axios.post(
        buildApiUrl(GODSEYE_API_BASE_URL, "/api/v1/public/upload-video"),
        formData
      );

      if (results.status === "success") {
        setVideo(
          buildApiUrl(
            GODSEYE_API_BASE_URL,
            `/api/v1/public/show-video/${results.path}`
          )
        );
      }
    } catch (err) {
      console.error("Video upload failed:", err);
      setSubmitError(
        err?.response?.data?.message ||
          "Video upload failed. Please verify the God's Eye API URL."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!video) {
      // Reset the form when the video is not being shown
      reset();
    }
  }, [video, reset]);

  return (
    <main className="max-w-[800px] min-h-[350px] mx-auto">
      {video ? (
        <div className="w-full min-h-[200px] md:min-h-[350px] border-4 rounded-md border-dashed p-1 border-primary/30 relative">
          <video
            src={video}
            controls
            className="w-full h-full object-cover rounded-md"
          />
          <button
            onClick={() => setVideo(null)}
            className="absolute top-4 right-4 bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="image"
              className="uppercase min-h-[200px] md:min-h-[400px] py-10 border-4 rounded-lg border-dashed bg-white/50 border-primary/30 flex items-center justify-center cursor-pointer hover:bg-white/80 transition-colors"
            >
              {video ? "Uploaded Successfully" : "Click to upload video"}
            </label>
            <input
              type="file"
              {...register("image")}
              id="image"
              className="hidden"
              accept="video/*"
            />
          </div>
          {submitError && (
            <p className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
              {submitError}
            </p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 font-bold py-4 px-8 bg-primary hover:bg-primary-dark rounded-md text-white w-full transition-colors shadow-lg shadow-primary/30"
          >
            {isSubmitting ? "Uploading..." : "Submit this Video"}
          </button>
        </form>
      )}
    </main>
  );
};

export default InputForm;
