"use client";

import { Check, ClipboardList, ShoppingBag, User } from "lucide-react";

const OnboardingSteps = () => {
  const steps = [
    {
      id: 1,
      title: "Business Information",
      status: "PENDING",
      icon: ShoppingBag,
      active: true,
    },
    {
      id: 2,
      title: "Business Documentation",
      status: "PENDING",
      icon: ClipboardList,
      active: false,
    },
    {
      id: 3,
      title: "Account Details",
      status: "PENDING",
      icon: User,
      active: false,
    },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-8">
      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className="relative w-12 h-12 flex-shrink-0">
          {/* Progress Circle Mockup */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              className="text-gray-200"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={125.6} // 2 * pi * 20
              strokeDashoffset={125.6 * (1 - 0.3)} // 30% progress
              className="text-primary"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">
            30%
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Complete your account setup
          </h2>
          <p className="text-sm text-gray-500">
            Finish your account setup and gain verified access.
          </p>
        </div>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              className={`p-4 rounded-lg flex items-start justify-between border ${step.active ? "bg-gray-50 border-gray-200" : "bg-gray-50/50 border-transparent"}`}
            >
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {step.title.split(" ")[0]}
                </h3>
                <div className="text-sm text-gray-900 font-medium mb-3">
                  {step.title.split(" ").slice(1).join(" ")}
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center">
                    {/* Pending Icon placeholder */}
                  </div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {step.status}
                  </span>
                </div>
              </div>

              <div
                className={`p-2 rounded-full ${step.active ? "bg-primary text-white" : "bg-primary text-white"}`}
              >
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OnboardingSteps;
