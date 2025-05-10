"use client";

import SectionHead from "@/components/shared/SectionHead";
import { categories } from "@/constant/medicine";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Animation variant
const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

const CategoriesSection = () => {
  const router = useRouter();

  const handleClick = (category: string) => {
    router.push(`/categories/${category}`);
  };

  return (
    <div className="my-16 px-4 max-w-6xl mx-auto">
      <SectionHead heading="Browse by Categories" />

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6"
        initial="hidden"
        animate="visible"
      >
        {categories.map((category, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariant}
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(category)}
            className="cursor-pointer bg-gradient-to-br from-white to-gray-200 border border-blue-300 rounded-xl p-5 text-center transition-all duration-300 hover:bg-gradient-to-tr hover:from-blue-50 hover:to-teal-50"
          >
            <h3 className="text-lg md:text-xl font-semibold text-gray-700">{category}</h3>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CategoriesSection;
