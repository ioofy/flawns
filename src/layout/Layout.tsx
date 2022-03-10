import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import NewFooter from "./components/Footer/NewFooter";
import NewHeader from "./components/Header/NewHeader";

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

  const noLayouts = [
    "/",
    "/auth/signin",
    "/auth/signup",
    "/auth/signup/flow/[id]",
    "/auth/signup/flow/thankyou/[id]",
  ];

  return (
    <>
      {noLayouts.includes(pathname) ? null : <NewHeader />}
      <main className="main-container __wxZSmv">{children}</main>
      {noLayouts.includes(pathname) ? null : <NewFooter />}
    </>
  );
};

export default Layout;
