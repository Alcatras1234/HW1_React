import React from 'react';
import '../NavigationBar/Bar.css';
import FilterInput from './FilterInput.tsx';
import FilterDropdown from './FilterDropDown';
import FilterCheckbox from './FilterrCheckBox';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={toggleSidebar}>
        ×
      </button>
      {isOpen && (
                <div className={'filters'}>
                    <FilterInput />
                    <FilterCheckbox />
                    <FilterDropdown />
                </div>
            )}
    </div>
  );
};

export default Sidebar;