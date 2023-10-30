"use client";
import { useAuthContext } from "@/context/AuthContext";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import axios from "axios";

export default function User() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    _id: "",
    isAdmin: false,
  });

  // Distructuring props from our custom useAuthContext Hook
  const { setIsUserValid } = useAuthContext();

  useEffect(() => {
    setIsUserValid(true);
    const userDetail = async () => {
      const res = await axios.get("/api/users/user");
      console.log("User Data retrived from token : ", res.data.data);
      setUser(res.data.data);
      return res.data.data;
    };
    userDetail();
  }, []);

  const header = (
    <img
      alt="Card"
      src="https://primefaces.org/cdn/primereact/images/usercard.png"
    />
  );
  const footer = (
    <>
      <Button label="Save" icon="pi pi-check" />
      <Button
        label="Cancel"
        severity="secondary"
        icon="pi pi-times"
        style={{ marginLeft: "0.5em" }}
      />
    </>
  );

  return (
    <Card
      title="User Info"
      className="
          mt-6 
          ml-6 
          mr-6 
          pt-6"
    >
      <div className="font-sans antialiased">
        <span className="font-medium">
          user :&nbsp;<span className="font-normal">{user.username}</span>
        </span>
        <p className="font-medium">
          user email :&nbsp;<span className="font-normal">{user.email}</span>
        </p>
      </div>
    </Card>
  );
}
