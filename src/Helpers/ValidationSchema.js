import * as yup from "yup";

const validationSchema = yup.object().shape({
  clinic_name: yup
    .string()
    .max(60, "Maximum length is 60")
    .matches(
      /^[a-zA-Z0-9-' ]+$/,
      "Only alphanumeric characters, hyphens, and spaces are allowed"
    ),
  clinicId: yup.number().required("Enter a valid Clinic ID"),
  userName: yup.string().required("Enter a valid Username"),
  password: yup.string().required("Enter a valid Password"),
});

export default validationSchema;

export const FormValidationSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  middleName: yup.string().required("Middle Name is required"),
  mrn: yup
    .number()
    .required("MRN is required")
    .typeError("MRN must be a number"),
  dob: yup
    .date()
    .required("Date of Birth is required")
    .typeError("Date of Birth must be a valid date"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Phone number is not valid") 
    .required("Phone number is required"),
  sex: yup.number().required("Gender is required").typeError("Gender must be a number"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  addressLine1: yup.string().required("Address Line 1 is required"),
  addressLine2: yup.string().required("Address Line 2 is required"),
  policyType: yup
    .number()
    .required("Policy type must be a number")
    .typeError("Policy type must be a number"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  country: yup.string().required("Country is required"),
  zip: yup.number().required("Zip code is required")
});

export const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};