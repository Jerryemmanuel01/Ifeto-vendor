"use client";

import { Check, ClipboardList, ShoppingBag, User } from "lucide-react";

import { selectUserProfile } from "@/lib/features/profile/profileSlice";
import { useSelector } from "react-redux";
import CircularProgress from "@/components/general/CircularProgress";

const OnboardingSteps = () => {
  const user = useSelector(selectUserProfile);
  const percentage = user?.onboarding?.percentage || 0;

  const steps = [
    {
      id: 1,
      title: "Business Information",
      status: user?.onboarding?.isBusinessInfoComplete
        ? "COMPLETED"
        : "PENDING",
      icon: ShoppingBag,
      active: !user?.onboarding?.isBusinessInfoComplete,
    },
    {
      id: 2,
      title: "Business Documentation",
      status: user?.onboarding?.isDocumentsComplete ? "COMPLETED" : "PENDING",
      icon: ClipboardList,
      active:
        user?.onboarding?.isBusinessInfoComplete &&
        !user?.onboarding?.isDocumentsComplete,
    },
    {
      id: 3,
      title: "Account Details",
      status: user?.onboarding?.isAccountDetailsComplete
        ? "COMPLETED"
        : "PENDING",
      icon: User,
      active:
        user?.onboarding?.isDocumentsComplete &&
        !user?.onboarding?.isAccountDetailsComplete,
    },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-8">
      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <CircularProgress percentage={percentage} size={48} />
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
              className={`p-4 rounded-lg flex items-start justify-between border ${
                step.status === "COMPLETED"
                  ? "bg-[#E3FFEF] border-transparent"
                  : step.active
                    ? "bg-gray-50 border-gray-200"
                    : "bg-gray-50/50 border-transparent"
              }`}
            >
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {step.title.split(" ")[0]}
                </h3>
                <div className="text-sm text-gray-900 font-medium mb-3">
                  {step.title.split(" ").slice(1).join(" ")}
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${step.status === "COMPLETED" ? "bg-primary text-white" : "bg-gray-300"}`}
                  >
                    {step.status === "COMPLETED" && (
                      <Check className="w-3 h-3" />
                    )}
                  </div>
                  <span
                    className={`text-xs font-medium uppercase tracking-wide ${step.status === "COMPLETED" ? "text-primary" : "text-gray-500"}`}
                  >
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
