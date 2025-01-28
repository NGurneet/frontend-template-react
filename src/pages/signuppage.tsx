// src/pages/Signup.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSignupMutation } from "../service/apiSlice"; // Import the RTK Query hook
import Header from "../components/Header";
import FormField from "../components/FormField";
import FormLayout from "../components/FormLayout";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [signup, { isLoading, error }] = useSignupMutation(); // Use RTK Query hook for signup

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await signup({ name: data.name, email: data.email, password: data.password, confirmPassword:data.confirmPassword }).unwrap(); // Make API call and unwrap the response
      alert("Signup successful! Please log in.");
      navigate("/login"); // Navigate to login page after successful signup
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <div>
      <Header title="Welcome" /> {/* Pass "Welcome" for Signup */}
      <FormLayout
        title="Sign Up"
        onSubmit={handleSubmit(onSubmit)}
        submitButtonText={isLoading ? "Signing up..." : "Sign Up"} // Show loading state
        linkText="Already have an account?"
        linkHref="/login"
      >
        <FormField
          name="name"
          label="Name"
          control={control}
          rules={{
            required: "Name is required",
          }}
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ""}
        />
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
        <FormField
          name="confirmPassword"
          label="Confirm Password"
          control={control}
          type="password"
          rules={{
            required: "Please confirm your password",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword ? errors.confirmPassword.message : ""}
        />
        {error && (
          <p style={{ color: "red" }}>Signup failed. Please try again.</p>
        )} {/* Display error message */}
      </FormLayout>
    </div>
  );
};

export default Signup;
