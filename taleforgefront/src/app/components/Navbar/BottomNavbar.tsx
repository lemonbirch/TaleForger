import React from 'react';
import Link from 'next/link';

const BottomNavbar = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-base-100 border-t border-base-300">
      <div className="navbar px-2 py-1">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" href="/">
            TaleForge
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            <li><Link href='/buildBook'>Build Book</Link></li>
            <li><Link href='/library'>Library</Link></li>
            <li><Link href='/pricing'>Pricing</Link></li>
            <li><Link href='/login'>Login</Link></li>
            <li><Link href='/signup'>Sign Up</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default BottomNavbar;
