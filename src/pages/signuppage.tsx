// src/pages/Signup.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Header from "../components/Header"; // Import the Header component
import FormField from "../components/FormField";
import FormLayout from "../components/FormLayout";

type FormData = {
  email: string;
  password: string;
};

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    navigate("/login"); // Navigate to login page after successful signup
  };

  return (
    <div>
      <Header title="Welcome" /> {/* Pass "Welcome" for Signup */}
      <FormLayout
        title="Sign Up"
        onSubmit={handleSubmit(onSubmit)}
        submitButtonText="Sign Up"
        linkText="Already have an account?"
        linkHref="/login"
      >
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
      </FormLayout>
    </div>
  );
};

export default Signup;
