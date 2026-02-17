"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Page() {
  const FAQData = [
    {
      question: "How do I place an order?",
      answer:
        "Placing an order is simple. Once you're logged in, browse the product you need by food categories or use the search bar, choose the items you are interested in buying, add items to your cart and proceed to checkout, add the pickup and delivery location, and confirm your pricing. Your order will be processed immediately and assigned for shipping.",
    },
    {
      question: "How is shipping cost calculated?",
      answer:
        "Shipping cost is based on product weight, destination and shipping speed. The final price is shown to you before you confirm your order so there are no surprises.",
    },
    {
      question: "Can I track my order in real time?",
      answer:
        "Yes. You can track every stage of your shipment - from pickup to transit to delivery - directly from the Orders section. Status updates refresh automatically.",
    },
    {
      question: "Do you deliver internationally?",
      answer:
        "Absolutely. Our platform supports international deliveries to multiple countries. Simply select your destination during the order process to see available shipping options and timelines.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach support at any time through the Help & Support page in your dashborad. Options include live chat, email, and hotline support depending on your region.",
    },
    {
      question: "Can I cancel an order?",
      answer:
        "Orders can be cancelled at no cost before pickup. Once the courier has collected the item, cancellation may not be possible.",
    },
  ];

  return (
    <div className="bg-[#FAFAFA] space-y-8  h-full flex flex-col">
      <div className="space-y-5">
        <div className="flex items-start justify-between">
          <div className="md:space-y-2 space-y-3">
            <h1 className="md:text-[32px] text-[16px] md:leading-8 leading-6 font-medium text-[#2A2A2A]">
              Support
            </h1>

            <p className="md:text-[16px] text-[14px] md:leading-6 leading-5">
              Get quick answers or reach our support team if you need help.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-[#FFFFFF] shadow-custom2 rounded-2xl">
        <div className="w-full">
          <h2 className="mb-6 text-center text-xl font-semibold lg:text-4xl">
            Frequently Asked Questions
          </h2>
          <h6 className="mb-6 text-center text-base text-light lg:text-xl">
            Find quick answers to the most common questions about shopping,
            shipping, and your account.
          </h6>
          <div className="">
            {FAQData.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left focus:outline-none"
      >
        <span className={`text-base ${isOpen ? "text-primary" : "text-light"}`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown
            className={`h-5 w-5 ${isOpen ? "text-primary" : "text-light"}`}
          />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="mt-2 text-light text-sm">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
