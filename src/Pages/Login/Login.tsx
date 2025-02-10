import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Box, Container, Typography } from "@mui/material";
import "./Login.css";
import useUserStore from "../../Store/userStore";
import { useNavigate } from "react-router-dom";
import {PInput} from "../../Components/PInput/PInput";

const schema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be at least 5 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const { setUser } = useUserStore();
  const onSubmit = (data : any) => {
    // console.log("Form Submitted", data);
    setUser(data);
    navigate("/home");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center", // Centers horizontally
        alignItems: "center", // Centers vertically
        minHeight: "100vh", // Full viewport height
        bgcolor: "grey.100", // MUI grey variant (equivalent to #f5f5f5)
      }}
    >
      <Box
        sx={{
          p: 3, // Padding (equivalent to 24px)
          borderRadius: 2, // Rounded corners
          bgcolor: "white", // White background
          boxShadow: 3, // MUI predefined shadow
          width: "100%", // Ensures it doesn't shrink
        }}
      >
        <Typography variant="h3">
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2, // Equivalent to 16px
          }}
        >
          <TextField
            label="Username"
            data-testid="username"
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            data-testid="password"
            type="password"
            label="Password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            disabled={!isValid}
            type="submit"
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
