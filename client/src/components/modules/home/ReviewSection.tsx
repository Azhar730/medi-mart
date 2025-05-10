/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import SectionHead from "@/components/shared/SectionHead";
import Loading from "@/components/utils/Loading";
import { useGetAllReviewQuery } from "@/redux/features/review/reviewApi";
import { Star, User } from "lucide-react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const ReviewSection = () => {
  const { data: response, isLoading, isError } = useGetAllReviewQuery({});

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <h3 className="text-main font-bold text-2xl flex items-center justify-center h-screen">
        Something went wrong!
      </h3>
    );
  }

  return (
    <div className="my-16 px-4">
      <SectionHead heading="Customer Reviews" />

      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-12 gap-6 mt-6"
        initial="hidden"
        animate="visible"
      >
        {response?.data?.map((review: any, index: number) => (
          <motion.div
            key={review._id}
            variants={cardVariants}
            custom={index}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 text-center"
          >
            <div className="flex justify-center mb-3">
              <div className="bg-blue-100 p-4 rounded-full shadow-sm">
                <User className="w-10 h-10 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-main mb-1">
              {review.user?.name || "Anonymous"}
            </h3>
            <p className="text-gray-600 italic mb-2">{review.comment}</p>
            <p className="flex justify-center gap-1 mt-2">
              {Array.from({ length: review.rating }, (_, i) => (
                <span
                  key={i}
                  className="text-blue-400 drop-shadow-sm hover:scale-110 transition-transform duration-300"
                >
                  <Star className="w-5 h-5 fill-blue-400 stroke-blue-500" />
                </span>
              ))}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ReviewSection;
