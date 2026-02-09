import { useFormik } from "formik";
import { AccountDetailsSchema } from "@/utils/schema";
import { useRouter } from "next/navigation";
import { useUpdateAccountDetailsMutation } from "@/lib/features/auth/authApi";
import { showErrorToast, showSuccessToast } from "@/utils/toastHelpers";
import { useGetProfileQuery } from "@/lib/features/profile/profileApi";

export const useAccountDetails = () => {
  const router = useRouter();
  const [updateAccountDetails, { isLoading }] =
    useUpdateAccountDetailsMutation();
  const { refetch } = useGetProfileQuery();

  const formik = useFormik({
    initialValues: {
      accountName: "",
      bank: "",
      accountNumber: "",
    },
    validationSchema: AccountDetailsSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          accountName: values.accountName,
          bankName: values.bank,
          accountNumber: values.accountNumber,
        };

        await updateAccountDetails(payload).unwrap();
        showSuccessToast("Account details updated successfully!");
        refetch();
        router.push("/dashboard");
      } catch (error: any) {
        showErrorToast(
          error?.data?.message || "Failed to update account details",
        );
      }
    },
  });

  return { formik, isLoading };
};
