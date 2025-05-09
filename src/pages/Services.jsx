import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'IPYNB → PDF',
    description: 'Convert your Jupyter notebooks into styled, professional PDFs.',
    status: 'available',
    route: '/convert/ipynb-to-pdf',
  },
  {
    title: 'PDF → Word',
    description: 'Convert static PDFs into editable Word docs.',
    status: 'coming-soon',
  },
  {
    title: 'Markdown → PDF',
    description: 'Render markdown content into printable PDFs.',
    status: 'coming-soon',
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } },
};

export default function Services() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white relative pb-24"
    >
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-10"
            variants={item}
          >
            Our Services
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ scale: 1.03, rotate: 0.2 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className={`p-6 rounded-xl backdrop-blur-md border border-white/10 transition-all duration-300
                  ${
                    service.status === 'available'
                      ? 'bg-gradient-to-br from-purple-600/20 to-blue-500/10 hover:shadow-purple-500/30'
                      : 'bg-white/5 opacity-50 cursor-not-allowed'
                  }`}
              >
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-sm text-white/80">{service.description}</p>
                {service.status === 'available' && service.route && (
                  <NavLink
                    to={service.route}
                    className="inline-block mt-4 px-4 py-2 text-sm font-medium bg-white text-black rounded-lg hover:bg-purple-200 transition"
                  >
                    Try Now →
                  </NavLink>
                )}
                {service.status === 'coming-soon' && (
                  <span className="inline-block mt-4 px-3 py-1 text-xs font-medium text-white bg-purple-700/40 rounded-full">
                    Coming Soon
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
