import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import nookies from "nookies";
import toast from "react-hot-toast";
import { logOut } from "../../redux/user/userSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const dispatch = useDispatch();
  const { isAuthorized, currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const navigation = [
    { name: "Home", to: "/", current: true },
    { name: "All Jobs", to: "/job/getall", current: false },
    {
      name:
        currentUser?.role === "Employer"
          ? "Candidate Application"
          : "Job Seeker",
      to: "/applications/me",
      current: false,
    },
    currentUser?.role === "Employer"
      ? { name: "Post new job", to: "/job/post", current: false }
      : null,
    { name: "View your job", to: "/job/me", current: false },
  ].filter((item) => item !== null);

  
  const handleLogout = (e) => {
    e.preventDefault();
    nookies.destroy(null, "token", { path: "/" });
    dispatch(logOut())
    toast.success("User logged out Successfully");
    navigate("/login");
  };

  return (
    <Disclosure
      as="nav"
      className={currentUser ? "navbarShow bg-gray-800" : "navbarHide"}
    >
      {({ open }) => (
        <>
          <div className="mx-auto w-100 px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-between ">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-[15px] uppercase font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                {isAuthorized && (
                  <Link
                    to="#"
                    className="flex items-center justify-center px-4 text-sm font-medium leading-6  whitespace-no-wrap bg-white border-2 border-transparent rounded-full shadow-sm hover:bg-transparent hover:text-white hover:border-white focus:outline-none"
                    onClick={handleLogout}
                  >
                    LOG OUT
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
