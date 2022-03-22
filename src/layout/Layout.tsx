import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import NewFooter from "./components/Footer/NewFooter";
import NewHeader from "./components/Header/NewHeader";
import styled from "styled-components";

interface LayoutProps {
  children: ReactNode;
}

const Main = styled.main`
  .toaster {
    font-family: "AllianceEB", sans-serif;
    font-size: 15px;
  }
`;

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
      <Main className="main-container __wxZSmv">{children}</Main>
      {noLayouts.includes(pathname) ? null : <NewFooter />}
    </>
  );
};

export default Layout;
