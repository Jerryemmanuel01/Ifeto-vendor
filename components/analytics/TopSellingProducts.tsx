import React from "react";

const products = [
  { name: "Attires - Adire", orders: 100, amount: "₦150,000.00" },
  { name: "Spices - Ball Pepper", orders: 40, amount: "₦50,000.00" },
  { name: "Tubers & Nuts - Yam", orders: 30, amount: "₦35,000.00" },
  { name: "Grains - Ofada Rice", orders: 20, amount: "₦25,000.00" },
  { name: "Spices - Mustard Seeds", orders: 15, amount: "₦15,000.00" },
];

const TopSellingProducts = () => {
  return (
    <div className="w-full">
      <h2 className="text-[18px] leading-7 font-semibold text-[#2A2A2A] mb-4 sm:mb-6">
        Top-Selling Products
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px] border-collapse text-[14px] leading-5">
          <thead>
            <tr className="text-gray-500 border-b border-gray-200">
              <th className="pb-3 sm:pb-4 font-medium text-left">
                Product Name
              </th>
              <th className="pb-3 sm:pb-4 font-medium text-left">Orders</th>
              <th className="pb-3 sm:pb-4 font-medium text-right">Amount</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 last:border-none"
              >
                <td className="py-4 sm:py-5 text-gray-700 whitespace-nowrap">
                  {product.name}
                </td>

                <td className="py-4 sm:py-5 text-gray-600">{product.orders}</td>

                <td className="py-4 sm:py-5 text-right font-medium text-[#27AE60]">
                  {product.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopSellingProducts;
