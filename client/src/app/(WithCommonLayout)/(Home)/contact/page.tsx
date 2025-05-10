"use client";

import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section className="mt-20 py-16 bg-white" id="contact">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-bold text-primary mb-2">Get in Touch</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Have a question about your order or need support? Reach out to our team — we’re here to help you 24/7.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 bg-gray-50 p-8 rounded-2xl shadow"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-primary"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-primary"
              required
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-primary"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-primary text-white font-medium py-3 px-6 rounded-lg hover:bg-primary/90 transition"
            >
              Send Message
            </button>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h4 className="text-xl font-semibold text-primary mb-1">Store Address</h4>
              <p className="text-gray-600">123 Health Street, Dhaka 1207, Bangladesh</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-primary mb-1">Phone</h4>
              <p className="text-gray-600">+880 1700-000000</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-primary mb-1">Email</h4>
              <p className="text-gray-600">support@medimart.com</p>
            </div>

            {/* Optional Map */}
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14586.305518205667!2d90.72477415!3d23.94005035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1746723858506!5m2!1sen!2sbd" width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
