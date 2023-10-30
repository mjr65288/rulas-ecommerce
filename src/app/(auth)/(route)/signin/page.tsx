"use client";
import Link from "next/link";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Distructuring props from our custom useAuthContext Hook
  const { setIsUserValid } = useAuthContext();

  // We used a Derived state to reduce needless re-rendering
  var buttonDisabled = true; // buttonDisabled will be re-calculated only when user changes

  if (user.username.length > 0 && user.password.length > 0) {
    buttonDisabled = false;
  } else {
    buttonDisabled = true;
  }

  async function onLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    //If the request is successful then we will get the response data,
    // else we will get the error on our catch block
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signin", user);
      console.log("Signin Success", response.data);
      toast.success("Signin Success");

      if (response.data.message === "Login Successful") {
        //After successful login nvaigate to User Home Page.
        router.push("/");
        //set isUserValid state to True if message equal 'Login Successful'
        setIsUserValid(true);
      }
    } catch (error: any | AxiosError) {
      console.log("Login Failed : ", error.response);

      toast.error(error.message);
      setErrorMessage("Invalid Credentials, please try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          <span
            className="
          text-slate-500 
          subpixel-antialiase
          uppercase"
          >
            sign in &nbsp;
          </span>
          <span
            className="
          subpixel-antialiase
          uppercase"
          >
            to smm
          </span>
        </h2>
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {loading ? "Processing..." : " "}
        </h2>
        <p
          className="
        text-sm
        text-center
        text-red-600
        font-bold
        subpixel-antialiased
        capitalize
        
         "
        >
          {errorMessage}
        </p>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onLogin}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              User Name
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={user.username}
                // the following does gurantees that we are operating on the lates state snpapshot
                onChange={(e) => {
                  setErrorMessage((prevState) => {
                    return "";
                  });
                  setUser((prevState) => {
                    return { ...prevState, username: e.target.value };
                  });
                }}
                placeholder="username"
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 
                shadow-sm 
                ring-1 ring-gray-300 ring-inset 
                focus:ring-1 focus:ring-gray-300 focus:ring-inset 
                placeholder:text-gray-400 
                 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={user.password}
                // the following does gurantees that we are operating on the lates state snpapshot
                onChange={(e) => {
                  setErrorMessage((prevState) => {
                    return "";
                  });
                  setUser((prevState) => {
                    return { ...prevState, password: e.target.value };
                  });
                }}
                placeholder="password"
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 
                shadow-sm 
                ring-1 ring-gray-300 ring-inset 
                focus:ring-1 focus:ring-gray-300 focus:ring-inset 
                placeholder:text-gray-400 
                 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={buttonDisabled}
              className="flex w-full justify-center rounded-md bg-cyan-500 px-3 py-1.5
              text-sm font-semibold leading-6 text-white shadow-sm 
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              disabled:cursor-not-allowed disabled:bg-cyan-300 hover:bg-cyan-400"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            href="/signup"
            className="font-semibold leading-6 text-cyan-500 hover:text-cyan-400"
          >
            Sign Up Here
          </Link>
        </p>
      </div>
    </div>
  );
}
