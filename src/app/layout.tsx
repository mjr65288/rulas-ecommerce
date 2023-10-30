"use client";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import Footer from "@/components/footer/Footer";
import "primeicons/primeicons.css";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
import NavBar from "@/components/navbar/NavBar";
import Content from "@/components/content/Content";
import SideBar from "@/components/sidebar/SideBar";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <div className="App wrapper">
            <SideBar onToggle={toggleHandler} isOpen={isOpen} />
            <Content onToggle={toggleHandler} isOpen={isOpen}>
              <NavBar onToggle={toggleHandler} isOpen={isOpen} />
              {children}
              <Footer absolute />
            </Content>
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
