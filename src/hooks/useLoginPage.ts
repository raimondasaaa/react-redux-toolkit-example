import { useState } from "react";
import { useLoginMutation } from "../api/auth";

export const useLoginPage = () => {
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await login({ username: email, password });
  };

  return {
    isLoading,

    email,
    password,

    onEmailChange,
    onPasswordChange,

    onLoginSubmit,
  };
};
