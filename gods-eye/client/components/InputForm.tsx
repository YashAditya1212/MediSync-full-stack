"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "@/lib/axios";
import { buildApiUrl } from "@/config/api";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

type FormProps = {
  image: string;
};

const InputForm = () => {
  const [video, setVideo] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>();

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    setSubmitError("");
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const response = await axios.post(
        "/api/v1/public/upload-video",
        formData
      );
      const results = response.data;
      if (results.status === "success") {
        setVideo(buildApiUrl(`/api/v1/public/show-video/${results.path}`));
      }
    } catch (err: any) {
      setSubmitError(
        err?.response?.data?.message ||
          "Video upload failed. Please verify NEXT_PUBLIC_BACKEND_URL."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {}, [video]);
  return (
    <>
      <main className="max-w-[900px] min-h-[400px] mx-auto">
        {video ? (
          <div className="w-full min-h-[200px] md:min-h-[400px] border-4 rounded-md border-dashed p-1">
            {video && (
              <img
                src={video}
                alt=""
                className="w-full h-full object-cover rounded-md"
              />
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="image"
                className="uppercase min-h-[200px] md:min-h-[400px] py-10 border-4 rounded-lg border-dashed bg-slate-100 flex items-center justify-center cursor-pointer"
              >
                {video ? "Uploaded Successfully" : "Click to upload"}
              </label>
              <input
                type="file"
                {...register("image")}
                id="image"
                className="hidden"
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
              className="font-bold py-4 px-8 bg-gray-900 rounded-md text-white w-full"
            >
            {isSubmitting ? "Uploading..." : "Submit this Video"}
            </button>
          </form>
        )}
      </main>
    </>
  );
};

export default InputForm;
