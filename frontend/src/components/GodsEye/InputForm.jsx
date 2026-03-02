import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const InputForm = () => {
  const [video, setVideo] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const response = await fetch(
        "http://127.0.0.1:8080/api/v1/public/upload-video",
        {
          method: "POST",
          body: formData,
        }
      );
      const results = await response.json();
      if (results.status === "success") {
        const new_api = await fetch(
          `http://127.0.0.1:8080/api/v1/public/show-video/${results.path}`,
          {
            method: "GET",
          }
        );
        setVideo(new_api.url);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {}, [video]);

  return (
    <main className="max-w-[900px] min-h-[400px] mx-auto dark:text-night-text">
      {video ? (
        <div className="w-full min-h-[200px] md:min-h-[400px] border-4 rounded-md border-dashed p-1 border-primary/30 dark:border-accent/30">
          <video
            src={video}
            controls
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="image"
              className="uppercase min-h-[200px] md:min-h-[400px] py-10 border-4 rounded-lg border-dashed bg-white/50 border-primary/30 flex items-center justify-center cursor-pointer hover:bg-white/80 transition-colors dark:bg-night-surface dark:border-accent/30 dark:hover:bg-night-surface/80"
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
          <button
            type="submit"
            className="mt-4 font-bold py-4 px-8 bg-primary hover:bg-primary-dark rounded-md text-white w-full transition-colors shadow-lg shadow-primary/30 dark:bg-accent dark:text-night-bg dark:hover:bg-primary dark:hover:text-white"
          >
            Submit this Video
          </button>
        </form>
      )}
    </main>
  );
};

export default InputForm;
