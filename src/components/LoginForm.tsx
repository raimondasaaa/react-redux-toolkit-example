import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React from "react";
import { CompanyLogo } from "./CompanyLogo";

export type LoginFormProps = {
  email: string;
  password: string;

  onEmailChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onPasswordChange: React.ChangeEventHandler<HTMLInputElement> | undefined;

  onLoginSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

export const LoginForm = (props: LoginFormProps) => {
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CompanyLogo />
        <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
          Prisijungimo forma
        </Typography>
        <Box component="form" noValidate onSubmit={props.onLoginSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="El. pašto adresas"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={props.onEmailChange}
            value={props.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Slaptažodis"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={props.onPasswordChange}
            value={props.password}
          />
          <Button
            type="submit"
            color="success"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Prisijungti
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
