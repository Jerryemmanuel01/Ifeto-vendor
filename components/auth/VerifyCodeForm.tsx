"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, KeyboardEvent, ClipboardEvent } from "react";

interface VerifyCodeFormProps {
  formik: any;
  resendTimer: number;
  onResendCode: (email: string) => void | Promise<void>;
  isResendDisabled: boolean;
  isLoading: boolean;
  isResending: boolean;
}

const VerifyCodeForm = ({
  formik,
  resendTimer,
  onResendCode,
  isResendDisabled,
  isLoading,
  isResending,
}: VerifyCodeFormProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const searchParams = useSearchParams();

  // Retrieve the parameters
  const email = decodeURIComponent(searchParams.get("email") ?? "");

  console.log(email);

  // Handle paste event
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    // Only process if it's 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      digits.forEach((digit, index) => {
        if (index < 6) {
          formik.setFieldValue(`code${index + 1}`, digit);
          formik.setFieldTouched(`code${index + 1}`, true);
          // Move focus to next input
          if (index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
          }
        }
      });
      // Focus last input after pasting
      setTimeout(() => {
        inputRefs.current[5]?.focus();
      }, 0);
    }
  };

  // Handle input change
  const handleChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) return;

    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    formik.setFieldValue(`code${index + 1}`, value);

    // Auto-focus next input when a digit is entered
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Backspace" &&
      !formik.values[`code${index + 1}`] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Get validation error for all fields
  const fullCode = Object.values(formik.values).join("");
  const fullCodeError =
    !!formik.errors.code1 ||
    !!formik.errors.code2 ||
    !!formik.errors.code3 ||
    !!formik.errors.code4 ||
    !!formik.errors.code5 ||
    !!formik.errors.code6;
  const hasError =
    formik.touched.code1 &&
    (fullCodeError || (fullCode.length < 6 && formik.submitCount > 0));
  const canSubmit = fullCode.length === 6 && !hasError;
  const isCountingDown = resendTimer > 0;
  const resendLabel = isCountingDown
    ? `Resend Code in ${resendTimer}s`
    : "Resend Code";

  return (
    <div className="lg:py-10 mt-7 lg:px-8 px-6 bg-white lg:shadow-custom rounded-2xl max-w-2xl mx-auto">
      <div className="text-center">
        <h2 className="font-bold font-inter text-2xl text-center">
          Verify Your Account
        </h2>
        <p className="text-light mt-2">
          We’ve sent a 6-digit code to your email
        </p>
      </div>

      <div className="mt-8">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex w-full justify-between gap-1 mb-4">
            {[1, 2, 3, 4, 5, 6].map((num, index) => (
              <input
                key={num}
                ref={(el) => {
                  inputRefs.current[index] = el!;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={formik.values[`code${num}`]}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                onBlur={formik.handleBlur}
                className={`sm:w-14 sm:h-14 w-12 h-12 text-center text-xl font-semibold border rounded-md outline-none transition-colors ${
                  hasError
                    ? "border-red-600 focus:border-red-600"
                    : "border-light-active focus:border-primary"
                }`}
                name={`code${num}`}
                id={`code${num}`}
              />
            ))}
          </div>

          {hasError && (
            <div className="text-red-600 text-xs text-center mt-2 mb-4">
              Please enter a valid 6-digit verification code
            </div>
          )}
          <div className="flex items-center gap-2 w-full justify-between mt-8">
            <span className="text-light text-sm">Didn't receive a code?</span>
            <button
              type="button"
              onClick={() => onResendCode(email)}
              disabled={isResendDisabled}
              className="text-primary text-sm font-semibold hover:underline disabled:text-light disabled:cursor-not-allowed"
            >
              {isResending ? "Resending" : resendLabel}
            </button>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              disabled={!canSubmit || isLoading}
              className={`w-full h-12 rounded-md text-center text-lg font-semibold cursor-pointer ${
                !canSubmit || isLoading
                  ? "bg-[#C7D3CC] text-white"
                  : "bg-primary text-white"
              }`}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyCodeForm;
