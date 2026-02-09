import * as Yup from "yup";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const passwordMessage =
  "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.";

export const SignupSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  country: Yup.string().required("Country is required"),
  password: Yup.string()
    .matches(passwordRegex, passwordMessage)
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const VerifyCodeSchema = Yup.object({
  code1: Yup.string().required("").matches(/^\d$/, ""),
  code2: Yup.string().required("").matches(/^\d$/, ""),
  code3: Yup.string().required("").matches(/^\d$/, ""),
  code4: Yup.string().required("").matches(/^\d$/, ""),
  code5: Yup.string().required("").matches(/^\d$/, ""),
  code6: Yup.string().required("").matches(/^\d$/, ""),
}).test(
  "all-digits",
  "Please enter a valid 6-digit verification code",
  function (values) {
    if (!values) return false;
    const codes = [
      values.code1,
      values.code2,
      values.code3,
      values.code4,
      values.code5,
      values.code6,
    ];
    return codes.every((code) => code && /^\d$/.test(code));
  },
);

export const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(passwordRegex, passwordMessage)
    .required("Password is required"),
});

export const ForgotPasswordSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const ResetPasswordSchema = Yup.object({
  password: Yup.string()
    .matches(passwordRegex, passwordMessage)
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const BusinessInfoSchema = Yup.object({
  businessName: Yup.string().required("Business Name is required"),
  businessType: Yup.string().required("Business Type is required"),
  registrationNumber: Yup.string().required("Registration Number is required"),
  taxId: Yup.string().required("Tax ID is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  contactPerson: Yup.string().required("Contact Person is required"),
  address: Yup.string().required("Address is required"),
  phone: Yup.string().required("Phone Number is required"),
});

export const AccountDetailsSchema = Yup.object({
  accountName: Yup.string().required("Account Name is required"),
  bank: Yup.string().required("Bank is required"),
  accountNumber: Yup.string()
    .required("Account Number is required")
    .min(5, "Account Number must be at least 5 characters"),
});

export const AddProductSchema = Yup.object({
  itemName: Yup.string().trim().required("Item name is required"),

  description: Yup.string()
    .trim()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),

  baseCost: Yup.number()
    .typeError("Enter a valid amount")
    .required("Base cost is required")
    .moreThan(0, "Amount must be greater than 0"),

  weight: Yup.number()
    .typeError("Enter a valid weight")
    .required("Weight is required")
    .moreThan(0, "Weight must be greater than 0"),

  category: Yup.string().required("Category is required"),

  storageInstructions: Yup.string()
    .trim()
    .max(500, "Maximum of 500 characters"),

  images: Yup.array()
    .min(3, "At least 3 images are required")
    .max(5, "You can upload a maximum of 5 images"),
});

export const EditProductSchema = Yup.object({
  name: Yup.string().required("Product name is required"),
  weight: Yup.string().required("Weight is required"),
  price: Yup.string().required("Price is required"),
  images: Yup.array()
    .min(3, "At least 3 images are required")
    .max(5, "You can upload a maximum of 5 images"),
});
