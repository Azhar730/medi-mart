"use client";
import SectionHead from "@/components/shared/SectionHead";
import Loading from "@/components/utils/Loading";
import { useGetAllMedicineQuery } from "@/redux/features/medicine/medicineApi";
import { IMedicine } from "@/types/medicine";
import MedicineCard from "../medicine/MedicineCard";
import Link from "next/link";
import Button from "@/components/utils/Button";
import { motion } from "framer-motion";

const FeaturedMedicines = () => {
  const queryParams = [{ name: "limit", value: 8 }];
  const {
    data: response,
    isLoading,
    isError,
  } = useGetAllMedicineQuery(queryParams);

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
        Something went wrong!
      </h3>
    );

  const medicines = response?.data;

  return (
    <section className="my-12 md:my-20 py-10">
      <SectionHead
        heading="Featured Medicines"
        description="Top quality medicines available now — Grab yours before it’s gone!"
      />
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.1 }}
      >
        {medicines.map((medicine: IMedicine, index: number) => (
          <MedicineCard key={index} medicine={medicine} />
        ))}
      </motion.div>
      <div className="text-center mt-8 flex justify-center">
        <Link href="/all-medicines">
          <Button text="View All Medicines" />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedMedicines;
