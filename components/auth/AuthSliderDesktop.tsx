import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AuthSliderDesktopProps {
  onIndexChange?: (index: number) => void;
}

const AuthSliderDesktop = ({ onIndexChange }: AuthSliderDesktopProps) => {
  const [index, setIndex] = useState(0);

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

  // Auto-play every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Notify parent component when index changes
  useEffect(() => {
    onIndexChange?.(index);
  }, [index, onIndexChange]);

  return (
    <div className="relative w-full h-[200px] flex items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.7 }}
          className="text-white font-inter absolute"
        >
          <h2 className="font-bold text-3xl">{slides[index].title}</h2>
          <p className="mt-1 text-xl">{slides[index].subtitle}</p>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-0 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setIndex(idx);
              onIndexChange?.(idx);
            }}
            className={`w-2 h-2 rounded-full transition-colors duration-500 ${
              idx === index ? "bg-[#1D8348]" : "bg-[#52525B]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AuthSliderDesktop;
