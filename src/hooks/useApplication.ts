import { useDispatch } from "react-redux";
import { authActions } from "../store/slices/auth";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { useValidateTokenMutation } from "../api/auth";

export const useApplication = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [validateToken] = useValidateTokenMutation({
    fixedCacheKey: "me",
  });

  const logout = () => {
    dispatch(authActions.logout());
  };

  useEffect(() => {
    validate();
  }, [location]);

  async function validate() {
    await validateToken(undefined);
  }

  return {
    logout,
  };
};
