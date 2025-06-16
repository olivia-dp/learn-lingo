import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import NavBar from "./components/NavBar/NavBar";
// import Loader from "./components/Loader/Loader";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
// const TeachersPage = lazy(() => import("./pages/TeachersPage"));
// const FavouritePage = lazy(() => import("./pages/CarPage/CarPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

function App() {
  return (
    <div>
      <NavBar />
      <Suspense fallback={<p>Loading</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/teachers" element={<TeachersPage />} /> */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
