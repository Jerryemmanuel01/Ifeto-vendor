import { Fragment } from "react";
import { CircleCheck } from "lucide-react";

export interface TrackingStep {
  status: string;
  date: string;
  time?: string;
  completed: boolean;
}

interface OrderTrackingStepsProps {
  steps: TrackingStep[];
}

const OrderTrackingSteps = ({ steps }: OrderTrackingStepsProps) => {
  return (
    <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-start lg:justify-between gap-0 lg:gap-4 min-w-fit mx-auto">
        {steps.map((step, index) => {
          const nextStep = steps[index + 1];
          const isConnectorActive = nextStep?.completed;

          return (
            <Fragment key={index}>
              <div className="flex flex-row lg:flex-col items-stretch lg:items-center gap-4 lg:gap-3 relative z-10 w-full lg:w-max lg:max-w-[120px]">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 lg:w-14 h-8 lg:h-14 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 border-2 z-10 relative ${
                      step.completed
                        ? "bg-primary border-primary text-white"
                        : "bg-[#CFCFCF] text-gray-400"
                    }`}
                  >
                    {step.completed ? (
                      <CircleCheck className="w-4 h-4 lg:w-8 lg:h-8" />
                    ) : (
                      <div className="w-3 h-3 lg:w-6 lg:h-6 rounded-full bg-white" />
                    )}
                  </div>

                  {index !== steps.length - 1 && (
                    <div
                      className={`lg:hidden w-[2px] flex-grow -my-1 pb-2 transition-colors duration-300 ${
                        isConnectorActive ? "bg-primary" : "bg-light"
                      }`}
                    />
                  )}
                </div>

                <div className="flex flex-col items-start lg:items-center text-left lg:text-center w-max pb-8 lg:pb-0 font-nunito">
                  <p
                    className={`font-semibold text-base ${
                      step.completed ? "text-dark" : "text-light"
                    }`}
                  >
                    {step.status}
                  </p>
                  <p className="text-sm text-light mt-0.5 whitespace-nowrap">
                    {step.date}
                  </p>
                  {step.time && (
                    <p className="text-xs text-light/80">{step.time}</p>
                  )}
                </div>
              </div>

              {index !== steps.length - 1 && (
                <div
                  className={`hidden lg:block w-[40px] h-[2px] mt-7 shrink-0 transition-colors duration-300 ${
                    isConnectorActive ? "bg-primary" : "bg-light"
                  }`}
                />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTrackingSteps;
