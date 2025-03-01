import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adduser } from "../redux/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ReduxStateType } from "../redux/store";

export default function Register() {
  const [user, setUser] = useState<register | null>();
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

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/v1/user/register`,
        user,
        {
          withCredentials: true,
        }
      );
      dispatch(adduser(res.data?.data));
      toast.success(res.data?.message);
      setUser(null);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg w-96 mt-10">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Account
        </h2>
        <form className="space-y-5" onSubmit={submitHandler}>
          <div>
            <input
              type="text"
              className="w-full p-3 bg-white/20 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 placeholder-white/70"
              placeholder="Full Name"
              id="username"
              value={user?.username || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUser({ ...user!, [e.target.id]: e.target.value });
              }}
              required
            />
          </div>
          <div>
            <input
              type="email"
              className="w-full p-3 bg-white/20 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 placeholder-white/70"
              placeholder="Email Address"
              id="email"
              value={user?.email || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUser({ ...user!, [e.target.id]: e.target.value });
              }}
              required
            />
          </div>
          <div>
            <input
              type="password"
              className="w-full p-3 bg-white/20 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 placeholder-white/70"
              placeholder="Password"
              id="password"
              value={user?.password || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUser({ ...user!, [e.target.id]: e.target.value });
              }}
              minLength={8}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-md font-semibold text-lg hover:bg-green-600 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-white/80 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-white font-bold">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
