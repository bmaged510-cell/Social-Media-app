
import React from "react";
import Footer from './../Footer/Footer';
import { Outlet } from "react-router-dom";
import MyNavbar from "./../Navbar/Navbar";

export default function Layout() {
  return (
    <>
      <MyNavbar />

      <div className=" w-full h-screen">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}
