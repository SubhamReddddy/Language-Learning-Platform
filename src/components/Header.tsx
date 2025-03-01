import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ReduxStateType } from "../redux/store";
import axios, { AxiosError } from "axios";
import { adduser } from "../redux/userSlice";
import { toast } from "react-toastify";

function Header() {
  const { user } = useSelector((state: ReduxStateType) => state.user);
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/v1/user/logout`,
        {
          withCredentials: true,
        }
      );
      dispatch(adduser(null));
      toast.success(res.data?.message);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message);
    }
  };
  return (
    <header className="bg-blue-600 text-white fixed top-0 left-0 w-full shadow-md z-10">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo and Name */}
        <div className="flex items-center space-x-2">
          <div className="bg-white text-blue-600 rounded-full h-10 w-10 flex items-center justify-center font-bold">
            L
          </div>
          <span className="text-xl font-semibold">Learn</span>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6">
            {user && (
              <>
                <li>
                  <NavLink
                    to={"/"}
                    className="hover:text-gray-200 transition-colors"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/carrier"}
                    className="hover:text-gray-200 transition-colors"
                  >
                    Carrier
                  </NavLink>
                </li>
                <li>
                  <button
                    className="hover:text-gray-200 transition-colors"
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
            {!user && (
              <li>
                <NavLink
                  to={"/login"}
                  className="hover:text-gray-200 transition-colors"
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
