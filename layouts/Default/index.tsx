import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface IProp {
  children: ReactNode;
}

const DefaultLayout: React.FC<IProp> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
