import React from "react";
import Logo from "./Logo";
import "./Navbar.css";
import { SearchBar } from "./Searchbar";
import { Profile } from "./profile";
import { CartButton } from "./CartButton";
export function Navbar() {
  return (
    <>
      <div className="nav-wrapper">
        <Logo />
        <SearchBar />
        <Profile />
        <CartButton itemCount={undefined} />
      </div>
    </>
  );
}
