import React from "react";
import MedicineCard from "./MedicineCard";
import { IMedicine } from "@/types/medicine";
import { useGetAllMedicineQuery } from "@/redux/features/medicine/medicineApi";
import Loading from "@/components/utils/Loading";

const CategoryMedicines = ({ category }: { category: string }) => {
  const queryParams = [{ name: "category", value: category }];
  const {
    data: response,
    isLoading,
    isError,
  } = useGetAllMedicineQuery(queryParams);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return (
      <h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
        Something went wrong !
      </h3>
    );
  }
  if (response?.data.length === 0) {
    return (
      <h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
        Medicine not Found
      </h3>
    );
  }
  const medicines = response?.data;
  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 capitalize text-primary">
        {category} Medicines
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {medicines?.map((medicine: IMedicine, index: number) => (
          <MedicineCard key={index} medicine={medicine} />
        ))}
      </div>
    </div>
  );
};

export default CategoryMedicines;
