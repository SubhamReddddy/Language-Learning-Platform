import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adduser } from "../redux/userSlice";
import { toast } from "react-toastify";
import { ReduxStateType } from "../redux/store";
import { Link, useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

export default function Login() {
  const [user, setUser] = useState<{ email: string; password: string } | null>({
    email: "",
    password: "",
  });
  const [loading, setloading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user: stateuser } = useSelector(
    (state: ReduxStateType) => state.user
  );

  useEffect(() => {
    if (stateuser) {
      navigate("/");
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user!, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setloading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/v1/user/login`,
        user,
        { withCredentials: true }
      );
      dispatch(adduser(res.data?.data));
      toast.success(res.data?.message);
      setUser(null);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setloading(false);
    }
  };

  return loading ? (
    <LoadingScreen />
  ) : (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back
        </h2>
        <form className="space-y-5" onSubmit={submitHandler}>
          <div>
            <input
              type="email"
              id="email"
              value={user?.email || ""}
              onChange={handleChange}
              className="w-full p-3 bg-white/20 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-white/70"
              placeholder="Email Address"
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              value={user?.password || ""}
              onChange={handleChange}
              className="w-full p-3 bg-white/20 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-white/70"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-3 rounded-md font-semibold text-lg hover:bg-purple-600 transition"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-white/80 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-white font-bold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
