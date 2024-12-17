import React, { useState } from 'react';

import NavBar from './NavBar';
import Sidebar from '../SideMenu/SideBar';


const NaviBar: React.FC = () => {
    const [isSideBarOpen, setSidebarOpen] = useState<boolean>(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSideBarOpen);
    }

    return (
        <>
            <div>
                <NavBar toggleSidebar={toggleSidebar} />
                <Sidebar isOpen={isSideBarOpen} toggleSidebar={toggleSidebar}/>
                
            </div>
        </>
    );
}

export default NaviBar;