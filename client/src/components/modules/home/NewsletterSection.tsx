"use client";

import { motion } from "framer-motion";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    toast.success("Subscribed successfully!");
    setEmail("azharmahmud730@gmail.com");
  };

  return (
    <section className="py-16 px-4 md:px-8 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
          Subscribe to our Newsletter
        </h2>
        <p className="text-gray-600 text-sm md:text-base mb-8">
          Get the latest updates on new medicines, discounts, and health tips.
        </p>

        <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="w-full md:w-[350px] px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition duration-300"
          >
            <PaperPlaneIcon className="w-4 h-4" />
            Subscribe
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Newsletter;
