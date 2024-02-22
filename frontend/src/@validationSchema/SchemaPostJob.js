// validationSchema.js
import * as yup from "yup";

const validationSchema = yup.object().shape({
  title: yup.string().required("Job title is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  location: yup.string().required("Location is required"),
  salarytype: yup.string().required("Salary type is required"),
  fixedSalary:yup.number().required("Fixed salary is required"),
  salaryFrom:yup.number().required("From salary is required"),
  salaryTo:yup.number().required("To salary is required"),
//     .number()
//     .when("salarytype", {
//       is: "fixed",
//       then: 
//     }),
//   salaryFrom: yup
//     .number()
//     .when("salarytype", {
//       is: "range",
//       then: yup.number().required("Salary From is required"),
//     }),
//   salaryTo: yup
//     .number()
//     .when(["salarytype", "salaryFrom"], {
//       is: (salarytype, salaryFrom) => salarytype === "range" && !!salaryFrom,
//       then: yup
//         .number()
//         .min(yup.ref("salaryFrom"), "Salary To must be greater than Salary From")
//         .required("Salary To is required"),
//     }),
});

export default validationSchema;
