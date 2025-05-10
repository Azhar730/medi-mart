/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Loading from "@/components/utils/Loading";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { addMedicine } from "@/redux/features/cart/cartSlice";
import { useGetSingleMedicineQuery } from "@/redux/features/medicine/medicineApi";
import { useCreateReviewMutation } from "@/redux/features/review/reviewApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IMedicine } from "@/types/medicine";
import { Modal } from "antd";
import { MessageCircle, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import MediForm from "../form/MediForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewValidation } from "./medicineValidation";
import MediInput from "../form/MediInput";
import Button from "@/components/utils/Button";
import { motion } from "framer-motion";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const MedicineDetails = ({ medicineId }: { medicineId: string }) => {
  const { data: response, isLoading, isError } = useGetSingleMedicineQuery(medicineId);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [addReview] = useCreateReviewMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => setIsModalOpen(false);

  const handleSubmit = async (data: any) => {
    const medicineId = response?._id;
    const userId = user?.id;

    const modifiedData = {
      ...data,
      medicine: medicineId,
      user: userId,
    };

    const toastId = toast.loading("Sending Review...");

    try {
      const res = await addReview(modifiedData).unwrap();
      if (res.success) {
        setIsModalOpen(false);
        toast.success(res.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", { id: toastId });
    }
  };

  const handleAddMedicine = (medicine: IMedicine) => {
    dispatch(addMedicine(medicine));
    toast.success("Medicine added to cart");
  };

  if (isLoading) return <Loading />;

  if (isError || !response)
    return (
      <h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
        Something went wrong!
      </h3>
    );

  const medicine = response?.data;

  if (!medicine)
    return (
      <h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
        Medicine not found!
      </h3>
    );

  return (
    <motion.div
      className="max-w-5xl bg-gray-200 rounded-xl shadow-lg p-6 mt-32 md:mt-48 mb-20 w-[90%] md:w-[88%] mx-auto flex flex-col items-center justify-center"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image Section */}
        <motion.div variants={fadeInUp}>
          <Image
            width={500}
            height={400}
            src={
              medicine?.image ||
              "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop"
            }
            alt={`${medicine.brand} ${medicine.model}`}
            className="w-full h-64 md:h-[400px] object-cover rounded-xl shadow-md"
          />
        </motion.div>

        {/* Details Section */}
        <motion.div className="flex flex-col justify-center gap-4" variants={fadeInUp}>
          <h3 className="text-primary text-3xl font-bold">{medicine.brand} {medicine.model}</h3>
          <p className="text-gray-600">{medicine.description}</p>

          <div className="flex flex-col text-sm gap-2 text-gray-700">
            <p><strong>Name:</strong> {medicine.name}</p>
            <p><strong>Category:</strong> {medicine.category}</p>
            <p><strong>Prescription Required:</strong> {medicine.requiredPrescription ? "Yes" : "No"}</p>
            <p><strong>Manufacturer:</strong> {medicine.manufacturer}</p>
            <p><strong>Price:</strong> ${medicine.price.toLocaleString()}</p>
            <p><strong>Expiry Date:</strong> {new Date(medicine?.expiryDate).toLocaleDateString()}</p>
            <p><strong>Stock:</strong> {medicine.quantity}</p>
          </div>

          <div className="flex items-center gap-x-6 mt-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className={`bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-x-2 transition-all duration-300 shadow hover:bg-blue-600 ${
                medicine?.quantity === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => handleAddMedicine(medicine)}
              disabled={medicine?.quantity === 0}
            >
              <ShoppingCart size={18} /> Add to Cart
            </motion.button>

            <Modal
              footer={null}
              title="Write a Review"
              open={isModalOpen}
              onCancel={handleCancel}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <MediForm
                  className=""
                  onSubmit={handleSubmit}
                  resolver={zodResolver(reviewValidation)}
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <MediInput name="comment" label="Comment" placeHolder="Write your comment..." type="text" />
                    <MediInput name="rating" label="Rating" placeHolder="0-5" type="number" />
                  </div>
                  <div className="mt-4">
                    <Button text="Submit Review" type="submit" isFullWidth={true} />
                  </div>
                </MediForm>
              </motion.div>
            </Modal>

            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={showModal}
              className="border border-teal-400 text-teal-500 bg-gray-100 p-2 rounded-md hover:bg-gray-200 transition-all duration-300"
            >
              <MessageCircle />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MedicineDetails;
