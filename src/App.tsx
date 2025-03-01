import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { lazy, Suspense, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import { ToastContainer, Bounce } from "react-toastify";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { adduser } from "./redux/userSlice";
import Auth from "./components/Auth";
import { setCarrierInRedux } from "./redux/carrierSlice";
//components
const Home = lazy(() => import("./components/Home"));
const Learn = lazy(() => import("./components/Learn"));
const Quiz = lazy(() => import("./components/Quiz"));
const Result = lazy(() => import("./components/Result"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Carrier"));
const Carrier = lazy(() => import("./pages/Register"));
const TaskReview = lazy(() => import("./pages/TaskReview"));

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND}/api/v1/user/details`,
          {
            withCredentials: true,
          }
        );
        dispatch(adduser(res.data?.user));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const res = (await axios.get(
          `${import.meta.env.VITE_BACKEND}/api/v1/task/gettasks`,
          {
            withCredentials: true,
          }
        )) as AxiosResponse<Root>;
        dispatch(setCarrierInRedux(res.data.tasks.carrier));
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        console.log(err.response?.data.message);
      }
    })();
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route index element={<Auth children={<Home />} />} />
          <Route path="/learn" element={<Auth children={<Learn />} />} />
          <Route path="/quiz" element={<Auth children={<Quiz />} />} />
          <Route path="/result" element={<Auth children={<Result />} />} />
          <Route path="/carrier" element={<Auth children={<Carrier />} />} />
          <Route
            path="/carrier/review/:id"
            element={<Auth children={<TaskReview />} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </BrowserRouter>
  );
};

export default App;
