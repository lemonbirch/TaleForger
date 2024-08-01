import React from 'react';

const ThemeController = () => {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost text-base">
        Theme
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60 ml-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048">
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content bg-base-300 rounded-box mt-2 w-52 p-2 shadow-lg max-h-60 overflow-y-auto"
        style={{ top: '100%' }}
      >
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-ghost"
            aria-label="Default"
            value="default" />
          
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-ghost"
            aria-label="halloween"
            value="halloween" />
          
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-ghost"
            aria-label="forest"
            value="forest" />
         
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-ghost"
            aria-label="Aqua"
            value="aqua" />
        
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-ghost"
            aria-label="Pastel"
            value="pastel" />
        
        </li>
      </ul>
    </div>
  );
};

export default ThemeController;
