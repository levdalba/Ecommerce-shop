import React from 'react';
import Logo from './Logo';
import './Navbar.css';
import { SearchBar } from './Searchbar';
import { Profile } from './Profile';
import { CartButton } from './CartButton';
function Navbar() {
  return (
    <>
      <div className="nav-wrapper">
        <Logo />
        <SearchBar />
        <Profile />
        <CartButton itemCount={0} />
      </div>
    </>
  );
}
export default Navbar;
