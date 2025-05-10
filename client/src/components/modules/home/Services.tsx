"use client";

import { motion } from "framer-motion";
import {
  FaCapsules,
  FaTruck,
  FaPhoneAlt,
  FaNotesMedical,
} from "react-icons/fa";

const services = [
  {
    title: "Online Medicine",
    icon: <FaCapsules className="text-4xl text-primary" />,
    description:
      "Order medicines online and get them delivered straight to your door from verified pharmacies.",
  },
  {
    title: "24/7 Support",
    icon: <FaPhoneAlt className="text-4xl text-primary" />,
    description:
      "Our support team is always available to answer your queries and resolve any issues instantly.",
  },
  {
    title: "Express Delivery",
    icon: <FaTruck className="text-4xl text-primary" />,
    description:
      "Fast and reliable medicine delivery service in under 2 hours within major cities.",
  },
  {
    title: "Doctor Consultation",
    icon: <FaNotesMedical className="text-4xl text-primary" />,
    description:
      "Book a video consultation with certified doctors for prescriptions, advice, and health tips.",
  },
];

const Services = () => {
  return (
    <section className="py-20 mt-20 bg-white" id="services">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold text-primary mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            MediMart offers a range of services designed to make your health
            journey easy, fast, and reliable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-md transition"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
