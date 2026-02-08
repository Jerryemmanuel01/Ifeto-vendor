import BusinessInfoForm from "@/components/onboarding/BusinessInfoForm";
import OnboardingSteps from "@/components/onboarding/OnboardingSteps";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <OnboardingSteps />
      <BusinessInfoForm />
    </div>
  );
}
