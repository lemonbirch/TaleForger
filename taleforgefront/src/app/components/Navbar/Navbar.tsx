import Link from 'next/link';
import React from 'react';
import SignInDrawer from '../SignInDrawer';
import ThemeController from '../ThemeController';

const Navbar = () => {
  console.log("navbar")

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="navbar bg-base-100 px-10"> 
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl pl-10" href="/"> 
            TaleForge
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-10 items-center"> 
            <li><Link href='/buildBook'>Build Book</Link></li>
            <li><Link href="/library">Library</Link></li>
            <li><Link href='pricing'>Pricing</Link></li>
            <li><ThemeController/></li>
            <li><SignInDrawer /></li>
          
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
