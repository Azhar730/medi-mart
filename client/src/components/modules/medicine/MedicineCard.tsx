/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IMedicine } from "@/types/medicine";
import { useDeleteMedicineMutation } from "@/redux/features/medicine/medicineApi";
import { toast } from "sonner";
import {
  Edit2,
  Eye,
  MessageCircle,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addMedicine } from "@/redux/features/cart/cartSlice";
import Swal from "sweetalert2";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { Modal } from "antd";
import { useState } from "react";
import MediForm from "../form/MediForm";
import MediInput from "../form/MediInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewValidation } from "./medicineValidation";
import Button from "@/components/utils/Button";
import { useCreateReviewMutation } from "@/redux/features/review/reviewApi";

const MedicineCard = ({
  medicine,
  isAdmin,
}: {
  medicine: IMedicine;
  isAdmin?: boolean;
}) => {
  const user = useAppSelector(selectCurrentUser);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [deleteMedicine] = useDeleteMedicineMutation();
  const [addReview] = useCreateReviewMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const showModal = () => {
    setIsModalOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (data: any) => {
    const medicineId = medicine?._id;
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
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Delete Medicine?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting Medicine...");
        try {
          const result = await deleteMedicine(medicine?._id).unwrap();
          if (result?.success) {
            toast.success(result?.message, { id: toastId });
          } else {
            toast.error(result?.message, { id: toastId });
          }
        } catch (error: any) {
          toast.error(error?.data?.message || "Something went wrong", {
            id: toastId,
          });
        }
        Swal.fire("Deleted!", "Medicine has been deleted.", "success");
      }
    });
  };

  const handleAddMedicine = (medicine: IMedicine) => {
    dispatch(addMedicine(medicine));
    toast.success("Medicine added to cart");
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-52 overflow-hidden">
        <div
          className={cn(
            "absolute top-2 left-2 text-white text-xs font-semibold py-1 px-3 rounded-full shadow-sm",
            {
              "bg-green-500": medicine.inStock,
              "bg-rose-500": !medicine.inStock,
            }
          )}
        >
          {medicine?.inStock ? "In Stock" : "Out of Stock"}
        </div>
        <Image
          height={200}
          width={200}
          src={
            medicine?.image ||
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop"
          }
          alt={medicine.name || "Product Image"}
          className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-5 space-y-2">
        <p className="text-sm font-semibold text-gray-700">Name: {medicine?.name}</p>
        <p className="text-sm font-medium text-gray-600">Category: {medicine?.category}</p>
        <p className="text-sm font-bold text-primary">Price: ${medicine.price}</p>

        {!isAdmin && (
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              className="p-2 rounded-full bg-gray-100 text-orange-500 border border-orange-300 hover:bg-orange-100 transition"
              onClick={() => handleAddMedicine(medicine)}
              disabled={medicine?.quantity === 0}
            >
              <ShoppingCart size={18} />
            </button>

            {/* Review Modal */}
            <Modal
              footer={null}
              loading={loading}
              title="Review"
              open={isModalOpen}
              onCancel={handleCancel}
            >
              <MediForm
                className="space-y-4"
                onSubmit={handleSubmit}
                resolver={zodResolver(reviewValidation)}
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <MediInput
                    placeHolder="Comment"
                    name={"comment"}
                    label="Comment"
                    type="text"
                  />
                  <MediInput
                    placeHolder="Rating"
                    name={"rating"}
                    label="Rating"
                    type="number"
                  />
                </div>
                <div className="flex justify-start gap-4 mt-4">
                  <Button isFullWidth={true} text="Send Review" type="submit" />
                </div>
              </MediForm>
            </Modal>

            <button
              onClick={showModal}
              className="p-2 rounded-full bg-gray-100 text-teal-500 border border-teal-300 hover:bg-teal-100 transition"
            >
              <MessageCircle size={18} />
            </button>
            <button
              onClick={() => router.push(`/medicine/${medicine?._id}`)}
              className="p-2 rounded-full bg-gray-100 text-blue-500 border border-blue-300 hover:bg-blue-100 transition"
            >
              <Eye size={18} />
            </button>
          </div>
        )}

        {isAdmin && (
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={() =>
                router.push(`/dashboard/update-medicine/${medicine?._id}`)
              }
              className="p-2 rounded-full bg-gray-100 text-blue-500 border border-blue-300 hover:bg-blue-100 transition"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 rounded-full bg-gray-100 text-red-500 border border-red-300 hover:bg-red-100 transition"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MedicineCard;
