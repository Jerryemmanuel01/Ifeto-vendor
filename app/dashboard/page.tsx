"use client";

import BusinessInfoForm from "@/components/onboarding/BusinessInfoForm";
import BusinessDocumentForm from "@/components/onboarding/BusinessDocumentForm";
import AccountDetailsForm from "@/components/onboarding/AccountDetailsForm";
import OnboardingSteps from "@/components/onboarding/OnboardingSteps";
import DashboardSkeleton from "@/components/skeletons/DashboardSkeleton";
import { useGetProfileQuery } from "@/lib/features/profile/profileApi";

export default function DashboardPage() {
  const { data: response, isLoading } = useGetProfileQuery();
  const user = response?.data;

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const isOnboarding = user?.onboarding?.status !== "COMPLETE";

  if (isOnboarding) {
    return (
      <div className="flex flex-col gap-6">
        <OnboardingSteps />

        {/* Conditional Rendering of Forms based on Onboarding Status */}
        {!user?.onboarding?.isBusinessInfoComplete && <BusinessInfoForm />}

        {user?.onboarding?.isBusinessInfoComplete &&
          !user?.onboarding?.isDocumentsComplete && <BusinessDocumentForm />}

        {user?.onboarding?.isBusinessInfoComplete &&
          user?.onboarding?.isDocumentsComplete &&
          !user?.onboarding?.isAccountDetailsComplete && <AccountDetailsForm />}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
        <p className="text-gray-500">Welcome back, {user?.firstName}!</p>
        {/* Dashboard widgets will go here */}
        Go ahead and add the dashboard component here
      </div>
    </div>
  );
}
