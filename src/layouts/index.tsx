import { useSelector } from "react-redux";

import { RootState } from "../store";

import { LoadingLayout } from "./Loading";
import { LoginLayout } from "./Login";
import { ApplicationLayout } from "./Application";
import { AnimatePresence } from "framer-motion";

export const LayoutContainer = () => {
  const { name } = useSelector((state: RootState) => state.layout);

  const possibleLayouts: Record<RootState["layout"]["name"], JSX.Element> = {
    loading: <LoadingLayout key="loading-layout" />,
    login: <LoginLayout key="login-layout" />,
    application: <ApplicationLayout key="application-layout" />,
  };

  return <AnimatePresence mode="wait">{possibleLayouts[name]}</AnimatePresence>;
};
