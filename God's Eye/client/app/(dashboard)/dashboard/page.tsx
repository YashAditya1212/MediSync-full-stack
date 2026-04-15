"use client";
import { SimpleChart } from "@/components/charts/SimpleChart";
import CustomChart from "@/components/charts/CustomChart";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
type Props = {};

export default function Page({}: Props) {
  const {
    data: accidents,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["accidents"],
    queryFn: async () => {
      const { data } = await axios.get("/api/v1/accident/all");
      return data;
    },
  });
  return (
    <>
      {/* <SimpleChart /> */}
      <h2 className="text-xl sm:text-2xl pb-5 font-bold underline">
        Accidents Overview(Per month)
      </h2>
      {error && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
          Failed to load accident overview.
        </p>
      )}
      {accidents?.datas && <CustomChart datas={accidents?.datas} />}
    </>
  );
}
