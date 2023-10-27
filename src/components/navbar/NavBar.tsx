"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import "primeicons/primeicons.css";
import { Avatar } from "primereact/avatar";
import styles from "@/styles/NavBar.module.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import "@/app/globals.css";

const NavBar = (props: any) => {
  const router = useRouter();

  // Distructuring props from our custom useAuthContext Hook
  const { isUserValid, setIsUserValid, setIsMenuOpen } = useAuthContext();

  const [hideUserMenu, setHideUserMenu] = useState(true);

  const onLogout = async () => {
    try {
      //setLoading(true);
      setHideUserMenu(true);
      setIsUserValid(false);
      await axios.get("/api/users/logout");
      console.log("Logout Success");
      //toast.success("Logout Success");
      router.push("/signin");
    } catch (error: any) {
      console.log("Logout Failed : ", error.message);
      //toast.error(error.message);
    } finally {
      //setLoading(false);
    }
  };

  const onUserHome = () => {
    router.push("/user");
  };

  // Callback executes the onToggle() passed from the Root layout
  // and update the context value of IsMenuOpen
  const toggleMenuBar = () => {
    props.onToggle();
    setIsMenuOpen((prevState: boolean) => {
      return !prevState;
    });
  };

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-cyan-500 mb-3">
        <div className="container px-4 mx-auto flex items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            {isUserValid ? (
              <>
                <button
                  className={`${styles["layout-menu-button"]} 
                  ${styles["p-link"]}
                `}
                  onClick={toggleMenuBar}
                >
                  <i className="pi pi-bars"></i>
                </button>
              </>
            ) : (
              <Link
                href="/signin"
                className="mt-10 text-center text-2xl 
                font-semibold subpixel-antialiased
                hover:font-bold leading-9 tracking-tight text-white"
              >
                SMM
              </Link>
            )}
          </div>
          {isUserValid ? (
            <div
              className={
                "lg:flex flex-grow items-center" + (true ? " flex" : " hidden")
              }
            >
              <div
                className="lg:flex flex-grow items-center"
                id="example-navbar-warning"
              >
                <ul className="flex flex-col lg:flex-row list-none ml-auto">
                  <li>
                    <button className="nav-link">
                      <Avatar
                        icon="pi pi-user"
                        style={{ backgroundColor: "#2196F3", color: "#ffffff" }}
                        shape="circle"
                        onClick={() => {
                          setHideUserMenu((prevState: boolean) => {
                            return !prevState;
                          });
                        }}
                      />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </nav>
      <ul
        className={`
        ${styles["user-menu"]} 
        ${hideUserMenu ? styles["hide-user-menu"] : ""}`}
      >
        <li role="menuitem">
          <button className="p-link" onClick={onUserHome}>
            <i className="pi pi-fw pi-home"></i>
            <span>User Home</span>
          </button>
        </li>
        <li role="menuitem">
          <button className="p-link" onClick={onLogout}>
            <i className="pi pi-fw pi-sign-out"></i>
            <span>Log out</span>
          </button>
        </li>
      </ul>
    </>
  );
};

export default NavBar;
