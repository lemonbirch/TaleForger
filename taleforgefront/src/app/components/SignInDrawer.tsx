'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/app/firebase/config';

const SignInDrawer = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // You might want to add a redirect here
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer-4" className="drawer-button btn btn-link text-base">
          {user ? `Hey, ${user.displayName || 'User'}` : 'Sign In'}
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {user ? (
            <>
              <li><Link href='/profile'>Profile</Link></li>
              <li><button onClick={handleSignOut}>Sign Out</button></li>
            </>
          ) : (
            <>
              <li><Link href="/login">Log In</Link></li>
              <li><Link href='/signup'>Sign Up</Link></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SignInDrawer;