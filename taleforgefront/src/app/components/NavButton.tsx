'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface NavButtonProps {
  type?: 'button' | 'submit' | 'reset';
  content: React.ReactNode;
  path: string;
}

const NavButton: React.FC<NavButtonProps> = (props) => {
  const router = useRouter();

  const navigateToPage = (path: string) => {
    console.log("Navigating to:", path);  // Debugging statement
    router.push(path);
  };

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log("Button clicked");  // Debugging statement
    navigateToPage(props.path);
    console.log("create clicked");  // Debugging statement
  };

  return (
    <button 
      type={props.type || 'button'}  // Default to 'button' if type is not provided
      className="btn btn-primary btn-lg" 
      onClick={handleClick}
    >
      {props.content}
    </button>
  );
};

export default NavButton;
