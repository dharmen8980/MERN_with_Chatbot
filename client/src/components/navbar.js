import React from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiSearch } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full bg-slate-50 z-10">
      <nav className="flex flex-row justify-between px-[4rem] py-[1rem] shadow-lg">
        <div>
          <div className="text-xl">
            <p className="">E-COM</p>
          </div>
        </div>
        <div>
          <div className="flex flex-row justify-between gap-[3rem] relative top-1">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">
              <FiShoppingCart className="text-2xl" />
            </Link>
            <input
              type="text"
              placeholder="Search"
              className="h-8  border-2 px-2 relative bottom-1"
            />
            <FiSearch className="text-2xl  absolute right-0 cursor-pointer" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
