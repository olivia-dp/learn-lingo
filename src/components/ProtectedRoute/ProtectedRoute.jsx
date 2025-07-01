import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectIsAuth, selectIsAuthLoading } from "../../redux/auth/selectors";
import Loader from "../Loader/Loader";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsAuth);
  const isLoading = useSelector(selectIsAuthLoading); // добавим селектор ниже
  const location = useLocation();

  if (isLoading) {
    return <Loader />;
  }

  return isLoggedIn ? children : <Navigate to="/" state={{ from: location }} replace />;
};

export default ProtectedRoute;
