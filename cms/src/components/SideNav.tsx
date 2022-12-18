import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Icons
import DescriptionIcon from '@mui/icons-material/Description';
import PostAddIcon from '@mui/icons-material/PostAdd';


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const NavItem = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
        >
            <Box sx={{ p: 3 }}>
                <Typography>Pages</Typography>
            </Box>
        </div>
    )
}

const a11yProps = (index: number, path: string) => {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
      to: `${path}`
    };
  }
  

const SideNav = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
       
           <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider', paddingTop: '50px' }}
            >
                <Tab 
                    label="Pages"
                    component={NavLink}  
                    icon={<DescriptionIcon />}
                    iconPosition={`start`}
                    {...a11yProps(0, '/pages')} />
                <Tab 
                    label="Posts"
                    component={NavLink}   
                    icon={<PostAddIcon />}
                    iconPosition={`start`}
                    {...a11yProps(1, '/posts')} />
            </Tabs>
        
            
        
    );

    // return (
    //         <nav className=" navbar navbar-expand-lg navbar-light bg-light show d-lg-block sidebar collapse bg-white">
    //             <div className="position-sticky h-100">
    //                 <ul className="navbar-nav  list-group list-group-flush ">
    //                     <li className="nav-item  ">
    //                         <NavLink className="nav-link list-group-item list-group-item-action py-2 ripple" to="/pages">
    //                             Pages
    //                         </NavLink>
    //                     </li>
    //                     <li className="nav-item ">
    //                         <NavLink className="nav-link list-group-item list-group-item-action py-2 ripple" to="/posts">
    //                             Posts
    //                         </NavLink>
    //                     </li>
    //                 </ul>
    //             </div>
    //         </nav>
        
    // );
};

export default SideNav;