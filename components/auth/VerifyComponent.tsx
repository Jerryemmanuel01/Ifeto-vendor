"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Logo from "@/assets/images/IFETO-Logo-1.png";
import authImage from "@/assets/images/authImg.png";
import authImage2 from "@/assets/images/authImg2.png";
import AuthSliderMobile from "@/components/auth/AuthSliderMobile";
import AuthSliderDesktop from "@/components/auth/AuthSliderDesktop";
import VerifyCodeForm from "@/components/auth/VerifyCodeForm";
import useVerify from "@/hooks/form-hooks/useVerify";
import verifyImg from "@/assets/images/verify.png";
import { useRouter, useSearchParams } from "next/navigation";
import useRedirectIfAuthenticated from "@/hooks/useRedirectIfAuthenticated";
import Spinner from "@/components/loaders/Spinner";

const VerifyComponent = () => {
  const { loading } = useRedirectIfAuthenticated();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Retrieve the parameters
  const userId = searchParams.get("userId");
  console.log(userId);

  useEffect(() => {
    if (!userId) {
      // Use replace to prevent the user from hitting the back button to land on this error page again
      router.replace("/auth/signup");
    }
  }, [userId, router]);

  const {
    formik,
    resendTimer,
    handleResendCode,
    isResendDisabled,
    isVerified,
    isLoading,
    isResending,
  } = useVerify(userId);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const backgroundImages = [authImage, authImage2];

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className="w-full min-h-screen flex flex-col lg:flex-row overflow-hidden lg:bg-[#F9F9F9] bg-white">
      {/* left side */}

      <div className="w-full lg:w-1/2 lg:px-[45px] lg:py-20 mt-3 mb-10">
        {isVerified ? (
          <div className="lg:py-10 mt-7 lg:px-8 px-6 bg-white lg:shadow-custom rounded-2xl max-w-2xl mx-auto flex flex-col items-center justify-center">
            <Image
              src={verifyImg}
              alt="success image"
              className="w-[300px] animate-pulse"
            />
            <p className="mt-8 text-2xl font-medium text-center">
              Your account has been verified successfully.
            </p>
            <button
              onClick={() => router.replace("/auth/login")}
              className="bg-primary h-12 w-full rounded-md px-5 mt-12 text-white font-semibold text-lg cursor-pointer"
            >
              Continue to Login
            </button>
          </div>
        ) : (
          <div>
            {/* logo */}
            <div className="flex justify-center items-center">
              <Image src={Logo} alt="logo" className="lg:w-[266px] w-[152px]" />
            </div>

            {/* mobile slider */}
            <AuthSliderMobile />

            {/* forms */}
            <VerifyCodeForm
              formik={formik}
              resendTimer={resendTimer}
              onResendCode={handleResendCode}
              isResendDisabled={isResendDisabled}
              isLoading={isLoading}
              isResending={isResending}
            />
          </div>
        )}
      </div>

      {/* right side desktop*/}
      <div className="relative hidden lg:block w-full lg:w-1/2 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={backgroundIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${backgroundImages[backgroundIndex].src})`,
            }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-[#00000033]"></div>
        <div className="absolute bottom-14 left-10 right-10 z-10">
          <AuthSliderDesktop onIndexChange={setBackgroundIndex} />
        </div>
      </div>
    </section>
  );
};

export default VerifyComponent;
