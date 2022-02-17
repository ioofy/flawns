import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const router = useRouter();
  const { children } = props;
  const { pathname } = router;

  // data that we provide to hide a nav
  // @reference
  // https://github.com/vercel/next.js/discussions/16865

  const noLayouts = ["/auth/signin", "/auth/signup"];

  return (
    <>
      {noLayouts.includes(pathname) ? null : <Header />}
      <main className="main-container __wxZSmv">{children}</main>
      {noLayouts.includes(pathname) ? null : <Footer />}
    </>
  );
};

export default Layout;
