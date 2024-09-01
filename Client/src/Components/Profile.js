import React from "react";
import { useAuth } from "../store/Authcontext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home page after logout
    toast.success("Logout Successful");
  };

  return (
    <div
      className="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover"
      style={{
        backgroundImage: "url('https://source.unsplash.com/1L71sPT5XKc')",
      }}
    >
      <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
        {/* Profile Card */}
        <div
          id="profile"
          className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
        >
          <div className="p-4 md:p-12 text-center lg:text-left">
            {/* Image for mobile view */}
            <div
              className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
              style={{
                backgroundImage: "url('/Profile.jpg')",
              }}
            ></div>

            <h1 className="text-3xl font-bold pt-8 lg:pt-0">KhataBook</h1>
            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              <svg
                className="h-4 fill-current text-green-700 pr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
              </svg>{" "}
              Expense Tracking Professionally
            </p>
            <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
              <svg
                className="h-4 fill-current text-green-700 pr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
              </svg>{" "}
              Jammu - 32.73°N , 74.87°E
            </p>
            <p className="pt-8 text-sm">
              Market Best Expense Tracking Platform , Save more Grow more
            </p>
            <p className="pt-3 text-sm">Hope To Meet You Soon</p>

            <div className="pt-12 pb-8">
              <button
                onClick={handleLogout}
                className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"
              >
                Logout
              </button>
            </div>

            {/* Social Icons */}
            <div className="mt-6 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-between">
              <p className="pt-3 text-sm">Get In Touch</p>
              <a className="link" href="#">
                <svg
                  className="h-6 fill-current text-gray-600 hover:text-green-700"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Facebook</title>
                  <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0" />
                </svg>
              </a>
              <a className="link" href="#">
                <svg
                  className="h-6 fill-current text-gray-600 hover:text-green-700"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Twitter</title>
                  <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.6 3.415-1.68 1.318-3.809 2.103-6.102 2.103-.398 0-.79-.023-1.174-.067 2.179 1.396 4.768 2.209 7.557 2.209 9.054 0 14.001-7.498 14.001-13.986 0-.209 0-.423-.015-.637.961-.695 1.8-1.562 2.46-2.549l-.047-.02z" />
                </svg>
              </a>
              <a className="link" href="#">
                <svg
                  className="h-6 fill-current text-gray-600 hover:text-green-700"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>LinkedIn</title>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.851-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554V9h3.414v1.561h.049c.476-.901 1.637-1.852 3.369-1.852 3.6 0 4.265 2.37 4.265 5.455v6.287h-.001zM5.337 7.433c-1.144 0-2.07-.928-2.07-2.07 0-1.144.926-2.071 2.07-2.071 1.143 0 2.07.927 2.07 2.071 0 1.142-.927 2.07-2.07 2.07zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.791 0 0 .771 0 1.727v20.545C0 23.229.791 24 1.771 24h20.451C23.21 24 24 23.229 24 22.273V1.727C24 .771 23.209 0 22.225 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Image for large screens */}
        <div className="w-full lg:w-2/5">
          <img
            src="/Profile.jpg"
            className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
