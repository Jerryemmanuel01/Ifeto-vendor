import { useEffect } from "react";
import { useFormik } from "formik";
import { BusinessSchema } from "@/utils/schema";
import { toast } from "sonner";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/lib/features/profile/profileApi";

export const useBusinessDetails = () => {
  const { data: profileData } = useGetProfileQuery();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const formik = useFormik({
    initialValues: {
      businessName: "",
      contactPerson: "",
      emailAddress: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      country: "Nigeria",
    },
    validationSchema: BusinessSchema,
    validateOnMount: false,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await updateProfile(values).unwrap();
        toast.success("Business details updated successfully");
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to update business details");
      }
    },
  });

  useEffect(() => {
    if (profileData?.data) {
      const p = profileData.data;
      formik.setValues({
        businessName: p.businessName || "",
        contactPerson: p.contactPerson || p.name || "",
        emailAddress: p.emailAddress || p.email || "",
        phone: p.phone || "",
        street: p.street || p.address || "",
        city: p.city || "",
        state: p.state || "",
        country: "Nigeria",
      });
    }
  }, [profileData]);

  return { formik, isLoading };
};
