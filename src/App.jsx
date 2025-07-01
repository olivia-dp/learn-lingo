import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { useSelector } from "react-redux";
import NavBar from "./components/NavBar/NavBar";
import { selectIsLogInModalOpen, selectIsRegisterModalOpen } from "./redux/modal/selectors";
import LoginModal from "./components/LoginModal/LoginModal";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "./redux/auth/slice";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Loader from "./components/Loader/Loader";
import TrialLessonModal from "./components/TrialModal/TrialModal";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const TeachersPage = lazy(() => import("./pages/TeachersPage/TeachersPage"));
const FavoritePage = lazy(() => import("./pages/FavoritePage/FavoritePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));



function App() {
  const isLogInOpen = useSelector(selectIsLogInModalOpen);
  const isRegisterOpen = useSelector(selectIsRegisterModalOpen);

  const useAuthListener = () => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(setUser({ uid: user.uid, email: user.email }));
        } else {
          dispatch(clearUser());
        }
      });
  
      return unsubscribe;
    }, [dispatch]);
  };

  useAuthListener();

  return (
    <div>
      <NavBar />
      {isLogInOpen && <LoginModal />}
      {isRegisterOpen && <RegisterModal />}
      <TrialLessonModal/>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/teachers"
            element={
                <TeachersPage />
            }
          />
          <Route
  path="/favorite"
  element={
    <ProtectedRoute>
      <FavoritePage />
    </ProtectedRoute>
  }
/>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
