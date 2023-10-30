"use client";
import React from "react";
import { classNames } from "primereact/utils";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Menu } from "primereact/menu";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";

//Need to import primereact css, otherwise the prime component will look funcky
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

//Templates for menu items
const neTableTemplate = () => {
  return (
    <Link
      href="/networkelement"
      className="px-3 py-2 
        flex items-center 
        text-sm uppercase 
        font-bold 
        leading-snug 
        text-grey hover:opacity-75"
    >
      Network Elements
    </Link>
  );
};

const NETCONFTemplate = () => {
  return (
    <Link
      href="/netconf"
      className="px-3 py-2 
        flex items-center 
        text-sm uppercase 
        font-bold 
        leading-snug 
        text-grey hover:opacity-75"
    >
      NETCONF Client
    </Link>
  );
};

const DashboardTemplate = () => {
  return (
    <Link
      href="/"
      className="px-3 py-2 
        flex items-center 
        text-sm uppercase 
        font-bold 
        leading-snug 
        text-grey hover:opacity-75"
    >
      Dashboard
    </Link>
  );
};

// menuItems
const menuItems = [
  {
    template: DashboardTemplate,
  },
  {
    template: neTableTemplate,
  },
  {
    template: NETCONFTemplate,
  },
];

const SideBar = (props: any) => {
  // Distructuring props from our custom useAuthContext Hook
  const { isUserValid, setIsUserValid } = useAuthContext();
  return (
    <>
      {isUserValid ? (
        <div className={classNames("sidebar", { "is-open": props.isOpen })}>
          <div className="sidebar-header">
            <Button
              variant="link"
              onClick={props.toggle}
              style={{ color: "#fff" }}
              className="mt-4"
            >
              <FontAwesomeIcon icon={faTimes} pull="right" size="xs" />
            </Button>
            <h3>SMM</h3>
          </div>

          <Menu model={menuItems} className="w-full" />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SideBar;
