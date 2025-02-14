import { NavLink } from "react-router-dom";

function Header() {
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
                to={"/login"}
                className="hover:text-gray-200 transition-colors"
              >
                Login
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
