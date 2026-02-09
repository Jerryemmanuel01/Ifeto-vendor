import { useFormik } from "formik";
import { BusinessInfoSchema } from "@/utils/schema";
import { useUpdateBusinessInfoMutation } from "@/lib/features/auth/authApi";
import { useGetProfileQuery } from "@/lib/features/profile/profileApi";
import { showErrorToast, showSuccessToast } from "@/utils/toastHelpers";

const useBusinessInfo = () => {
  const [updateBusinessInfo, { isLoading }] = useUpdateBusinessInfoMutation();
  const { refetch } = useGetProfileQuery();

  const formik = useFormik({
    initialValues: {
      businessName: "",
      businessType: "",
      registrationNumber: "",
      taxId: "",
      email: "",
      contactPerson: "",
      address: "",
      phone: "",
    },
    validationSchema: BusinessInfoSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          businessName: values.businessName,
          businessType: values.businessType.toUpperCase(),
          businessEmail: values.email,
          contactPerson: values.contactPerson,
          phone: `+${values.phone}`,
          taxId: values.taxId,
          registrationNumber: values.registrationNumber,
          addressLine: values.address,
        };

        await updateBusinessInfo(payload).unwrap();
        showSuccessToast("Business information updated successfully!");
        refetch();
      } catch (error: any) {
        showErrorToast(
          error?.data?.message || "Failed to update business information",
        );
      }
    },
  });

  return { formik, isLoading };
};

export default useBusinessInfo;
