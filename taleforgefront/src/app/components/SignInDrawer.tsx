import React from 'react';
import Link from 'next/link';

const SignInDrawer = () => {
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-4" className="drawer-button btn btn-link text-base">Sign In</label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li><Link href="/login">Log In</Link></li>
          <li><Link href='/signup'>Sign Up</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default SignInDrawer;
