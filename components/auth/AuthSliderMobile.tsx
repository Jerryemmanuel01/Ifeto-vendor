import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AuthSliderMobile = () => {
  const slides = [
    {
      title: "Naturally African. Globally Delivered",
      subtitle: "Seamless worldwide shipping, straight from the source",
    },
    {
      title: "Ethical Goods, Direct from the Source",
      subtitle: "Bringing you natural goods with honest origins",
    },
  ];

  const [index, setIndex] = useState(0);

  // Auto-slide every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative lg:hidden mt-3">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.7 }}
          className="w-full text-center relative"
        >
          <h2 className="font-bold text-lg">{slides[index].title}</h2>
          <p className="mt-1 text-sm">{slides[index].subtitle}</p>
        </motion.div>
      </AnimatePresence>

      {/* Pagination Dots (Bottom Center) */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setIndex(idx)}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              idx === index ? "bg-green-500" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AuthSliderMobile;
