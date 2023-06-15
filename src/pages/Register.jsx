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
  Typography,
} from "@mui/material";
import { register as apiRegister } from "../../api";
import { Snackbar } from "@mui/material";
import { useState } from "react";

const getErrorFromCode = (code) => {
  const error = {
    unique: "Field is required",
    password_too_short: "Make sure the password is between 8 and 16 characters",
    password_too_common: "Password is too common",
  };
  return error[code] ?? "Error";
};

const FormError = ({ errors }) => {
  return (
    <Typography variant="body2" className="form-error">
      {typeof errors === "string" && <div key="general-error">{errors}</div>}
      {Array.isArray(errors) &&
        errors.map((errorObject, index) =>
          Object.entries(errorObject).map(([field, fieldErrors]) =>
            Array.isArray(fieldErrors) ? (
              fieldErrors.map((error, subIndex) => (
                <div key={`${field}-${subIndex}`}>
                  {getErrorFromCode(error) || "asd"}
                </div>
              ))
            ) : (
              <>
              <div key={`${field}-${index}`}>{fieldErrors}</div>
              </>
            )
          )
        )}
    </Typography>
  );
};

const FormTextField = ({
  label,
  name,
  type = "text",
  register,
  errors,
  required = false,
  api_errors,
}) => {
  const isEmailField = name === "email";
  const apiErrors = api_errors ?api_errors.filter((item) =>{
    console.log('item',Object.keys(item)[0])
    return Object.keys(item)[0] === name}) :[]
  
  return (
    <>
      {errors[name] && (
        <FormError errors={errors[name].message || "This field is required."} />
      )}
      {apiErrors && <FormError errors={apiErrors} />}
      <TextField
        label={label}
        type={type}
        variant="outlined"
        {...register(name, {
          required,
          ...(isEmailField && {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address.",
            },
          }),
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
    register,
  } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await apiRegister(data);
      console.log("Registration successful:", response);
      navigate("/login");
    } catch (error) {
      console.info(error?.response?.data?.error?.details);
      setError(error?.response?.data?.error?.details);
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
              api_errors={error}
              required
            />

            <FormTextField
              label="First Name"
              name="firstName"
              register={register}
              errors={errors}
              api_errors={error}
              required
            />

            <FormTextField
              label="Last Name"
              name="lastName"
              register={register}
              errors={errors}
              api_errors={error}
              required
            />

            <FormTextField
              label="Password"
              name="password"
              type="password"
              register={register}
              errors={errors}
              api_errors={error}
              required
            />

            <FormTextField
              label="Confirm Password"
              name="password2"
              type="password"
              register={register}
              api_errors={error}
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
