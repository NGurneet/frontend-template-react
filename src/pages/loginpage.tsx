// // src/pages/Login.tsx
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useLoginMutation } from "../service/apiSlice"; // Import the RTK Query hook
// import Header from "../components/Header";
// import FormField from "../components/FormField";
// import FormLayout from "../components/FormLayout";
// import { showSuccessToast } from "../utils/toast-utils";
// import { toast } from "react-toastify";

// type FormData = {
//   email: string;
//   password: string;
// };

// const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const [login, { isLoading, error }] = useLoginMutation(); // Use RTK Query hook for login

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const showSuccessToast = (message: string) => {
//     toast.success(message); // Show success toast
//   };

//   const showErrorToast = (message: string) => {
//     toast.error(message); // Show error toast
//   };

//   const onSubmit = async (data: FormData) => {
//     try {
//       const response = await login(data).unwrap(); // Make API call and unwrap the response
//       const token = response.token;
      
//       if (token) {
//         localStorage.setItem("authToken", token); // Store the token in localStorage
//         showSuccessToast("Login successful!"); // Display success toast
//         navigate("/"); // Redirect to home/dashboard after successful login
//       } else {
//         showErrorToast("Token not received. Please try again."); // Error if token is missing
//       }
//     } catch (err) {
//       console.error("Login failed:", err);
//       showErrorToast("Login failed. Please check your credentials."); // Display error toast
//     }
//   };

//   return (
//     <div>
//       <Header title="Welcome Back" /> {/* Pass "Welcome Back" for Login */}
//       <FormLayout
//         title="Log In"
//         onSubmit={handleSubmit(onSubmit)}
//         submitButtonText={isLoading ? "Logging in..." : "Log In"} // Show loading state
//         linkText="Don't have an account?"
//         linkHref="/signup"
//       >
//         <FormField
//           name="email"
//           label="Email"
//           control={control}
//           rules={{
//             required: "Email is required",
//             pattern: {
//               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
//               message: "Invalid email address",
//             },
//           }}
//           error={!!errors.email}
//           helperText={errors.email ? errors.email.message : ""}
//         />
//         <FormField
//           name="password"
//           label="Password"
//           control={control}
//           type="password"
//           rules={{
//             required: "Password is required",
//             minLength: {
//               value: 6,
//               message: "Password must be at least 6 characters",
//             },
//           }}
//           error={!!errors.password}
//           helperText={errors.password ? errors.password.message : ""}
//         />
//         {error && (
//           <p style={{ color: "red" }}>Login failed. Please check your credentials.</p>
//         )} {/* Display error message */}
//       </FormLayout>
//     </div>
//   );
// };

// export default Login;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../service/apiSlice"; // Import the RTK Query hook
import Header from "../components/Header";
import FormField from "../components/FormField";
import FormLayout from "../components/FormLayout";
import { toast } from "react-toastify";

// Define the types for the form data
type FormData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate(); // Hook to navigate to different routes
  const [login, { isLoading, error }] = useLoginMutation(); // Use RTK Query hook for login

  // Set up form handling using react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Function to display success toast notifications
  const showSuccessToast = (message: string) => {
    toast.success(message);
  };

  // Function to display error toast notifications
  const showErrorToast = (message: string) => {
    toast.error(message);
  };

  // Function to handle form submission
  const onSubmit = async (data: FormData) => {
    try {
      const response = await login(data).unwrap(); // Make API call and unwrap the response
      const token = response.token;

      if (token) {
        localStorage.setItem("authToken", token); // Store the token in localStorage
        showSuccessToast("Login successful!"); // Display success toast
        navigate("/"); // Redirect to home/dashboard after successful login
      } else {
        showErrorToast("Token not received. Please try again."); // Error if token is missing
      }
    } catch (err) {
      console.error("Login failed:", err);
      showErrorToast("Login failed. Please check your credentials."); // Display error toast
    }
  };

  return (
    <div>
      <Header title="Welcome Back" /> {/* Pass "Welcome Back" for Login */}
      <FormLayout
        title="Log In"
        onSubmit={handleSubmit(onSubmit)}
        submitButtonText={isLoading ? "Logging in..." : "Log In"} // Show loading state
        linkText="Don't have an account?"
        linkHref="/signup"
      >
        {/* Email Input Field */}
        <FormField
          name="email"
          label="Email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            },
          }}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ""}
        />

        {/* Password Input Field */}
        <FormField
          name="password"
          label="Password"
          control={control}
          type="password"
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ""}
        />

        {/* Display error message if login fails */}
        {error && (
          <p style={{ color: "red" }}>Login failed. Please check your credentials.</p>
        )}
      </FormLayout>
    </div>
  );
};

export default Login;
