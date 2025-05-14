"use client";

import SectionHead from "@/components/shared/SectionHead";
import { offers } from "@/constant/offers";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Offers = () => {
  return (
    <section className="min-h-screen py-20 px-4 md:px-10">
      <SectionHead
        heading="Best Medicine Deals of the Month"
        description="Grab these limited-time health offers before they expire. Exclusive savings for our MediMart customers."
      />

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {offers.map((offer, idx) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
          >
            <div className="relative">
              <Image
                src={offer.image}
                alt={offer.title}
                width={500}
                height={300}
                className="w-full h-52 object-cover"
              />
              <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                {offer.discount} OFF
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-blue-700 mb-2">
                {offer.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">{offer.description}</p>
              <p className="text-xs text-gray-500 mb-4">
                ⏰ Offer valid until <strong>{offer.expires}</strong>
              </p>
              <Link
                href={offer.link}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-full transition"
              >
                Shop Now →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Offers;
