"use client";

import { blogs } from "@/constant/blog";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Blogs = () => {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/blogs/${id}`);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-primary mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
        Latest Health Blogs
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog, idx) => (
            <motion.div
              key={blog.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full h-60">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-contain p-4"
                />
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6 flex-1">
                  {blog.description.split(" ").slice(0, 40).join(" ")}...
                </p>
                <button
                  onClick={() => handleClick(blog.id)}
                  className="self-start bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-600 transition"
                >
                  Read More →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
