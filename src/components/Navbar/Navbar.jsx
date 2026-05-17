
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { useTheme } from "next-themes"; 
import { MdDarkMode, MdLightMode } from "react-icons/md"; 

export const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const SearchIcon = ({ size = 24, strokeWidth = 1.5, width, height, ...props }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={height || size}
    role="presentation"
    viewBox="0 0 24 24"
    width={width || size}
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth}
    />
    <path d="M22 22L20 20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} />
  </svg>
);

export default function MyNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme(); 

  const LoggedMenuItems = ["Profile", "Home", "Log Out"];
  const UnLoggedMenuItems = ["Login", "Register"];

  const navigate = useNavigate();
  const { userLogin, setuserLogin } = useContext(AuthContext);

  function logout() {
    localStorage.removeItem("UserToken");
    setuserLogin(null);
    navigate("/login");
  }

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="bg-white/90 dark:bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-gray-100 dark:border-white/[0.06] shadow-sm dark:shadow-none px-4"
      maxWidth="full"
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden text-gray-400 dark:text-white/40 hover:text-orange-500 transition-colors"
      />

      <NavbarBrand className="gap-4">
        <div className="flex items-center gap-2">
          <div className="text-orange-500">
            <AcmeLogo />
          </div>
          <p className="font-black text-gray-900 dark:text-white tracking-[0.2em] uppercase text-lg">
            <Link to="/">Rivo</Link>
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-gray-100 dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.08] rounded-xl px-3 py-2 hover:border-orange-300 dark:hover:border-orange-500/30 transition-all duration-300 max-w-[200px]">
          <SearchIcon size={14} className="text-gray-400 dark:text-white/25 shrink-0" />
          <input
            type="search"
            placeholder="Search..."
            className="bg-transparent text-[13px] text-gray-600 dark:text-white/60 placeholder:text-gray-400 dark:placeholder:text-white/20 outline-none w-full"
          />
        </div>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <NavbarContent className="hidden sm:flex gap-1" justify="center">
          {userLogin !== null && (
            <NavbarItem>
              <Link
                to="/"
                className="text-[13px] font-medium text-gray-500 dark:text-white/40 hover:text-orange-500 px-3 py-1.5 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all duration-200"
              >
                Home
              </Link>
            </NavbarItem>
          )}

          {userLogin === null && (
            <>
              <NavbarItem>
                <Link
                  to="/login"
                  className="text-[13px] font-medium text-gray-500 dark:text-white/40 hover:text-orange-500 px-3 py-1.5 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all duration-200"
                >
                  Login
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link
                  to="/register"
                  className="text-[13px] font-semibold text-white bg-gradient-to-r from-orange-500 to-rose-500 px-4 py-1.5 rounded-lg hover:opacity-90 active:scale-95 transition-all duration-200 shadow-[0_0_16px_rgba(249,115,22,0.2)]"
                >
                  Register
                </Link>
              </NavbarItem>
            </>
          )}
        </NavbarContent>

        <NavbarItem>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            {theme === "dark"
              ? <MdLightMode className="text-yellow-400 text-xl" />
              : <MdDarkMode className="text-gray-500 text-xl" />}
          </button>
        </NavbarItem>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <div className="p-[2px] rounded-full bg-gradient-to-tr from-orange-500 via-rose-400 to-orange-300 cursor-pointer hover:shadow-[0_0_12px_rgba(249,115,22,0.35)] transition-all duration-300">
              <Avatar
                as="button"
                className="transition-transform hover:scale-105 duration-200 border-2 border-white dark:border-[#0a0a0f]"
                color="warning"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </div>
          </DropdownTrigger>

          <DropdownMenu
            aria-label="Profile Actions"
            variant="flat"
            className="bg-white dark:bg-[#13131a] border border-gray-100 dark:border-white/[0.08] rounded-xl shadow-xl dark:shadow-2xl min-w-[160px]"
          >
            <DropdownItem key="Profile" className="text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/[0.05] rounded-lg my-0.5">
              <Link to="/profile" className="block text-[13px]">Profile</Link>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={() => logout()} className="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg my-0.5">
              <span className="block text-[13px]">Logout</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu className="bg-white/98 dark:bg-[#0d0d12]/98 backdrop-blur-xl border-t border-gray-100 dark:border-white/[0.06] pt-6 gap-1">
        {userLogin ? (
          LoggedMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                onClick={item === "Log Out" ? () => logout() : undefined}
                className={`w-full block py-3 px-4 rounded-xl text-[14px] font-medium transition-all duration-200 ${
                  item === "Log Out"
                    ? "text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                    : "text-gray-600 dark:text-white/50 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10"
                }`}
                to={item === "Log Out" ? "/login" : `/${item.toLowerCase()}`}
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))
        ) : (
          UnLoggedMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className={`w-full block py-3 px-4 rounded-xl text-[14px] font-medium transition-all duration-200 ${
                  item === "Register"
                    ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white text-center shadow-[0_0_16px_rgba(249,115,22,0.2)]"
                    : "text-gray-600 dark:text-white/50 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10"
                }`}
                to={`/${item.toLowerCase()}`}
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))
        )}
      </NavbarMenu>
    </Navbar>
  );
}