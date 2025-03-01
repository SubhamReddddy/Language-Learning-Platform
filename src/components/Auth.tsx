import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ReduxStateType } from "../redux/store";

const Auth: FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useSelector((state: ReduxStateType) => state.user);
  if (user) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default Auth;
