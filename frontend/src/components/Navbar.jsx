import React from 'react'
import { NavLink , useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location=useLocation()

  const navLinks = [
    { to: '/', label: 'Home' , active:'/' },
    { to: '/sorting/bubblesort', label: 'Sorting' , active:'/sorting' },
    { to: '/searching', label: 'Searching' , active:'/searching' },
    { to: '/graph', label: 'Graph' , active:'/graph' }
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-indigo-400 text-white shadow-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <NavLink
          to="/"
          className="text-xl font-semibold tracking-wide hover:text-white"
          onClick={closeMenu}
        >
          DSA Visualizer
        </NavLink>

        <button
          className="sm:hidden focus:outline-none stroke-white"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <nav className="hidden sm:flex gap-6">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className={() =>
                `text-sm font-medium p-3 rounded-md hover:bg-gray-200 hover:text-indigo-700 transition-colors 
                ${link.label!=='Home' && location.pathname.startsWith(link.active) && 'bg-indigo-700'}
                ${link.label==='Home' && location.pathname===link.active && 'bg-indigo-700'}
                `
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {isOpen && (
        <div className="sm:hidden bg-indigo-400 px-4 pb-4 pt-2 space-y-2">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className={({}) =>
                `block text-sm font-medium w-fit p-2 rounded-md hover:bg-gray-200 hover:text-indigo-700 transition-colors 
                ${link.label!=='Home' && location.pathname.startsWith(link.active) && 'bg-indigo-700'}
                ${link.label==='Home' && location.pathname===link.active && 'bg-indigo-700'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
