import React from "react";
import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";
import { useSelector } from "react-redux";

export default function NavBar() {
  const { authenticated } = useSelector((state) => state.auth);
  return (
    <>
      {authenticated ? (
        <SignedInMenu />
      ) : (
        <SignedOutMenu />
      )}
    </>
  );
}
