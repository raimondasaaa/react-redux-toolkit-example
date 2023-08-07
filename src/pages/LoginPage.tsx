import { Grid } from "@mui/material";
import { LoginForm } from "../components/LoginForm";
import { useLoginPage } from "../hooks/useLoginPage";

export const LoginPage = () => {
  const { email, password, onEmailChange, onPasswordChange, onLoginSubmit } =
    useLoginPage();

  return (
    <Grid
      container
      sx={{
        display: "grid",
        height: "100vh",
        width: "100vw",
        placeItems: "center",
      }}
    >
      <Grid item>
        <LoginForm
          email={email}
          password={password}
          onEmailChange={onEmailChange}
          onPasswordChange={onPasswordChange}
          onLoginSubmit={onLoginSubmit}
        />
      </Grid>
    </Grid>
  );
};
