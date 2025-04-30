import React from 'react'
import { NavLink } from 'react-router-dom';

const SortingNavbar = () => {  
    const navLinks = [
      { to: '/sorting/bubblesort', label: 'Bubblesort' },
      { to: '/sorting/selectionsort', label: 'Selectionsort' },
      { to: '/sorting/insertionsort', label: 'Insertionsort' }
    ];
  
  
    return (
      <header className=" w-full text-indigo-700 shadow-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <nav className=" sm:flex gap-6">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({isActive}) =>
                  `text-sm font-medium p-3 rounded-md hover:bg-gray-200 hover:text-indigo-700 transition-colors ${isActive && 'bg-slate-300'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
    );
}

export default SortingNavbar