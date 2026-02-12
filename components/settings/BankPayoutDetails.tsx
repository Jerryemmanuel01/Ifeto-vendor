import { BankPayoutSchema, BusinessSchema } from "@/utils/schema";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import verify from "@/assets/svgs/verify.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export default function BankPayoutDetails() {
  const formik = useFormik({
    initialValues: {
      accountName: "",
      bank: "",
      accountNumber: "",
    },
    validationSchema: BankPayoutSchema,
    validateOnMount: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const nigerianBanks = [
    "Access Bank",
    "Citibank Nigeria",
    "Ecobank Nigeria",
    "Fidelity Bank",
    "First Bank of Nigeria",
    "First City Monument Bank (FCMB)",
    "Globus Bank",
    "Guaranty Trust Bank (GTBank)",
    "Heritage Bank",
    "Keystone Bank",
    "Polaris Bank",
    "Providus Bank",
    "Stanbic IBTC Bank",
    "Standard Chartered Bank",
    "Sterling Bank",
    "Suntrust Bank",
    "Titan Trust Bank",
    "Union Bank of Nigeria",
    "United Bank for Africa (UBA)",
    "Unity Bank",
    "Wema Bank",
    "Zenith Bank",
  ];

  return (
    <div className="bg-[#FFFFFF] shadow-custom2 rounded-2xl p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-[24px] leading-8 font-semibold text-[#2A2A2A]">
          Bank & Payout Details
        </h1>
        <p className="text-[14px] leading-5 text-[#787878]">
          Your earnings will be sent to this account
        </p>
      </div>

      <FormikProvider value={formik}>
        <Form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-[14px] leading-5">
              Account Name <span className="text-[#B3261E]">*</span>
            </label>

            <Field
              name="accountName"
              placeholder="Halimah Enterprise"
              className={`text-[14px] leading-5 placeholder:text-[#CFCFCF] h-14 w-full px-4 rounded-[6px] border ${
                formik.touched.accountName && formik.errors.accountName
                  ? "border-[#B3261E]"
                  : "border-[#CFCFCF]"
              }`}
            />

            <ErrorMessage
              name="accountName"
              component="p"
              className="text-[12px] text-[#B3261E]"
            />
          </div>

          <div className="flex flex-col gap-1 h-full">
            <label className="text-[14px] leading-5">
              Bank <span className="text-[#B3261E]">*</span>
            </label>

            <Select
              value={formik.values.bank}
              onValueChange={(value) => {
                formik.setFieldValue("bank", value);
                formik.setFieldTouched("bank", true);
              }}
            >
              <SelectTrigger
                className={`
    text-[14px] leading-5
    h-14 min-h-[56px]
    w-full
    px-4
    py-0
    rounded-[6px]
    border
    bg-white
    flex items-center
    focus:ring-0 focus:outline-none
    ${
      formik.touched.bank && formik.errors.bank
        ? "border-[#B3261E]"
        : "border-[#CFCFCF]"
    }
  `}
              >
                <SelectValue
                  placeholder="Select your bank"
                  className="text-[#CFCFCF]"
                />
              </SelectTrigger>

              <SelectContent className="rounded-[6px]">
                {nigerianBanks.map((bank) => (
                  <SelectItem
                    key={bank}
                    value={bank}
                    className="text-[14px] leading-5"
                  >
                    {bank}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <ErrorMessage
              name="bank"
              component="p"
              className="text-[12px] text-[#B3261E]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[14px] leading-5">
              Account Number <span className="text-[#B3261E]">*</span>
            </label>
            <Field name="accountNumber">
              {({ field }: { field: any }) => (
                <input
                  {...field}
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); // remove non-digits
                    formik.setFieldValue("accountNumber", value);
                  }}
                  placeholder="0123456789"
                  className={`text-[14px] leading-5 placeholder:text-[#CFCFCF] h-14 w-full px-4 rounded-[6px] border ${
                    formik.touched.accountNumber && formik.errors.accountNumber
                      ? "border-[#B3261E]"
                      : "border-[#CFCFCF]"
                  }`}
                />
              )}
            </Field>

            <ErrorMessage
              name="accountNumber"
              component="p"
              className="text-[12px] text-[#B3261E]"
            />
          </div>

          <div className="p-4 bg-[#E3FFEF] border-l-2 border-[#27AE60] rounded-xl flex items-center gap-2.5">
            <Image src={verify} alt="verify-icon" />
            <p className="text-[14px] leading-5 text-[#787878]">
              This account has been verified
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 py-0 md:py-6">
            <button
              type="submit"
              className="px-5 h-12 bg-[#27AE60] rounded-[6px] text-[18px] leading-8 text-white font-semiboldw w-full cursor-pointer"
            >
              Save Changes
            </button>

            <button className="px-5 h-12 border border-[#27AE60] rounded-[6px] text-[18px] leading-8 text-[#27AE60] font-semiboldw w-full cursor-pointer">
              Cancel
            </button>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
}
