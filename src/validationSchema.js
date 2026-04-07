import * as yup from "yup";

export const schema = yup.object({
  name: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Name must contain only letters")
    .trim()
    .required("Name is required"),

  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),

  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
    .required("Mobile number is required"),

  age: yup
    .number()
    .min(18, "Age must be at least 18")
    .required("Age is required"),

  gender: yup
    .string()
    .required("Gender is required"),

  dob: yup
    .date()
    .typeError("Invalid date")
    .required("Date of birth is required"),

  address: yup.object({
    city: yup
      .string()
      .required("City is required"),

    state: yup
      .string()
      .required("State is required"),

    pincode: yup
      .string()
      .matches(/^[0-9]{6}$/, "Pincode must be exactly 6 digits")
      .required("Pincode is required")
  }),

  academic: yup.object({
    rollNumber: yup
      .string()
      .required("Roll Number is required"),

    collegeName: yup
      .string()
      .required("College Name is required"),

    course: yup
      .string()
      .required("Course is required"),

    department: yup
      .string()
      .required("Department is required"),

    year: yup
      .string()
      .required("Year is required"),

    cgpa: yup
      .number()
      .typeError("CGPA must be a number")
      .min(0, "CGPA cannot be negative")
      .max(10, "CGPA cannot exceed 10")
      .required("CGPA is required")
  }),

  skills: yup
    .array()
    .of(
      yup.object({
        skill: yup
        .string()
        .trim()
        .required("Skill is required")
      })
    )
    .min(1, "At least one skill is required"),

  account: yup.object({
    username: yup
      .string()
      .matches(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, underscore allowed")
      .min(4, "Minimum 4 characters")
      .required("Username is required"),

    password: yup
      .string()
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),

    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password"),null], "Passwords must match")
      .required("Confirm password is required")
  })
});