import React from "react";
import { useSelector } from "react-redux";
import SignedInMenu from "./SignedInMenu";

export default function NavBar() {
  const { authenticated } = useSelector((state) => state.auth);
  return <>{authenticated && <SignedInMenu />}</>;
}
