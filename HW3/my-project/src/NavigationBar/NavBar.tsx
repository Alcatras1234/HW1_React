import React from 'react';
import './Bar.css'; 

interface NavBarProps {
    toggleSidebar: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ toggleSidebar }) => {
    return (
        <nav className="navbar">
          <button className="menu-button" onClick={toggleSidebar}>
            ☰
          </button>
          <ul className='navbar-links'>
            <li><a href="#products" onClick={toggleSidebar}>Товары</a></li>
            <li><a href="#warehouses" onClick={toggleSidebar}>Склады</a></li>
            <li><a href="#about" onClick={toggleSidebar}>О системе</a></li>
            <li><a href="#profile" onClick={toggleSidebar}>Личная страница</a></li>
          </ul>
          
        </nav>
      );
}

export default NavBar;