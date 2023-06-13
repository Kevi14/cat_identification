import React from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography
} from "@mui/material";
import { register as apiRegister } from "../../api";
// Component to display form errors
const FormError = ({ error }) => (
  <Typography variant="body2" className="form-error">
    {error}
  </Typography>
);

// Custom component for form text field with error handling
// Custom component for form text field with error handling
const FormTextField = ({
    label,
    name,
    type = "text",
    register,
    errors,
    required = false
  }) => {
    // Check if the field is the email field
    const isEmailField = name === "email";
  
    return (
      <>
        {errors[name] && (
          <FormError error={errors[name].message || "This field is required."} />
        )}
        <TextField
          label={label}
          type={type}
          variant="outlined"
          {...register(name, {
            required,
            ...(isEmailField && {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address."
              }
            })
          })}
          sx={{ marginBottom: 2, width: "100%" }}
        />
      </>
    );
  };
  

export default function Register() {
  const {
    handleSubmit,
    formState: { errors },
    register
  } = useForm();
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    try {
      const response = await apiRegister(data);
      // Handle successful registration
      console.log("Registration successful:", response);
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      // Handle registration error
      console.log("Registration error:", error);
    }
  };
  return (
    <Container maxWidth="md">
      <Card sx={{ maxWidth: 400, margin: "auto", marginTop: 5 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Register
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormTextField
              label="Email"
              name="email"
              register={register}
              errors={errors}
              required
            />

            <FormTextField
              label="First Name"
              name="firstName"
              register={register}
              errors={errors}
              required
            />

            <FormTextField
              label="Last Name"
              name="lastName"
              register={register}
              errors={errors}
              required
            />

            <FormTextField
              label="Password"
              name="password"
              type="password"
              register={register}
              errors={errors}
              required
            />

            <FormTextField
              label="Confirm Password"
              name="password2"
              type="password"
              register={register}
              errors={errors}
              required
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "100%" }}
            >
              Register
            </Button>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              Already have an account?{" "}
              <Button component={RouterLink} to="/login" color="primary">
                Login
              </Button>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
