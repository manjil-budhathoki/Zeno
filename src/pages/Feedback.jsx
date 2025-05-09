import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const stars = [
  { emoji: "😡", label: "Terrible" },
  { emoji: "🙁", label: "Bad" },
  { emoji: "😐", label: "Okay" },
  { emoji: "😊", label: "Good" },
  { emoji: "😍", label: "Amazing" },
];

export default function Feedback() {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");

  const handleRating = (value) => {
    setRating(value);
    setTimeout(() => setStep(2), 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: [0.42, 0, 0.2, 1] }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl p-6 rounded-2xl w-full max-w-sm text-center"
          >
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }} className="text-5xl mb-4">📦</motion.div>
            <motion.h2 className="font-bold text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              How satisfied are you with the use of our product?
            </motion.h2>
            <div className="flex justify-center gap-2 mt-4">
              {stars.map((s, idx) => (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.2 }}
                  key={idx}
                  className="text-2xl hover:drop-shadow-md transition"
                  onClick={() => handleRating(s)}
                >
                  {s.emoji}
                </motion.button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">Select an option</p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: [0.42, 0, 0.2, 1] }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl p-6 rounded-2xl w-full max-w-sm text-center"
          >
            <div className="text-2xl mb-2 text-yellow-400">
              {"⭐".repeat(stars.indexOf(rating) + 1)}
            </div>
            <p className="text-sm text-gray-300 font-medium mb-4">
              {rating.label === "Amazing" ? "Super cool!" : rating.label}
            </p>
            <form onSubmit={handleSubmit}>
              <motion.textarea
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                placeholder="Tell us more..."
                className="w-full p-3 rounded-xl border text-sm border-white/20 bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.05 }}
                className="w-full mt-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition"
              >
                Send
              </motion.button>
            </form>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: [0.42, 0, 0.2, 1] }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl p-6 rounded-2xl w-full max-w-sm text-center"
          >
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className="text-5xl mb-4">
              💛
            </motion.div>
            <p className="font-semibold text-lg">Thank you for your feedback!</p>
            <p className="text-sm text-gray-300 mt-2">
              We do our best to take care of our customers.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
