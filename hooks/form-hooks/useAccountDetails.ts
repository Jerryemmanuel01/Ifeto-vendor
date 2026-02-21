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
      bankName: "",
      accountNumber: "",
    },
    validationSchema: AccountDetailsSchema,
    onSubmit: async (values) => {
      try {
        await updateAccountDetails(values).unwrap();
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
