import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { lazy, Suspense } from "react";
import LoadingScreen from "./components/LoadingScreen";

//components
const Home = lazy(() => import("./components/Home"));
const Learn = lazy(() => import("./components/Learn"));
const Quiz = lazy(() => import("./components/Quiz"));
const Result = lazy(() => import("./components/Result"));
const Login = lazy(() => import("./components/Login"));

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
