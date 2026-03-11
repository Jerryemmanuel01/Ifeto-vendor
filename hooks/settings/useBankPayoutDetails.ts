import { useFormik } from "formik";
import { BankPayoutSchema } from "@/utils/schema";
import {
  useGetProfileQuery,
  useUpdateBankDetailsMutation,
} from "@/lib/features/profile/profileApi";
import { useEffect } from "react";
import { toast } from "sonner";

export const useBankPayoutDetails = () => {
  const { data: profileData } = useGetProfileQuery();
  const [updateBankDetails, { isLoading }] = useUpdateBankDetailsMutation();

  const formik = useFormik({
    initialValues: {
      accountName: "",
      bankName: "",
      accountNumber: "",
    },
    validationSchema: BankPayoutSchema,
    validateOnMount: false,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        await updateBankDetails(values).unwrap();
        toast.success("Bank details updated successfully");
        resetForm();
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to update bank details");
      }
    },
  });

  useEffect(() => {
    if (profileData?.data) {
      const { accountName, bankName, accountNumber } = profileData.data;
      formik.setValues({
        accountName: accountName || "",
        bankName: bankName || "",
        accountNumber: accountNumber || "",
      });
    }
  }, [profileData]);

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

  return { formik, isLoading, nigerianBanks };
};
