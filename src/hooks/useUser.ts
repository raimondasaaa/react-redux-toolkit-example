import { useSelector } from "react-redux";
import { meSelector } from "../store/slices/user";

export const useUser = () => {
  const user = useSelector(meSelector);

  return {
    user,
  };
};
