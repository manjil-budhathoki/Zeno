import ConvertVisualButton from './Button';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      ease: [0.42, 0, 0.2, 1],
      duration: 0.6,
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 bg-white dark:bg-gradient-to-br dark:from-[#0f0c29] dark:via-[#302b63] dark:to-[#24243e] text-gray-900 dark:text-white transition-colors duration-300 overflow-hidden">

      {/* Soft Glowing Background Blob */}
      <div className="absolute -z-10 top-16 left-1/2 -translate-x-1/2 w-[320px] h-[320px] bg-gradient-to-br from-pink-400 to-purple-600 rounded-full blur-[120px] opacity-20"></div>

      {/* Flow Container */}
      <motion.div
        className="relative z-10 max-w-4xl text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={item}
          className="text-xs tracking-widest uppercase text-purple-500 mb-3 font-semibold"
        >
          Built for Devs
        </motion.p>

        <motion.h1
          variants={item}
          className="text-4xl md:text-6xl font-extrabold leading-tight"
        >
          <span className="text-black dark:text-white">The Fastest Way to</span><br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Convert & Style Documents
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 text-base md:text-lg text-gray-600 dark:text-white/70"
        >
          Turn Jupyter Notebooks into beautiful PDFs. Word, Markdown & more coming soon.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex justify-center"
        >
          <ConvertVisualButton />
        </motion.div>
      </motion.div>
    </section>
  );
}
