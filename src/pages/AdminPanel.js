import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import {Divider, Tabs} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import React from 'react';
import WaitingUserTable from "../components/AdminPanel/AdminPanelUser/WaitingUserTable";
import ActiveUserTable from "../components/AdminPanel/AdminPanelUser/ActiveUserTable";
import PostTable from "../components/AdminPanel/AdminPanelPost/PostTable";
import EventTable from "../components/AdminPanel/AdminPanelEvent/EventTable";
import FacultyTable from "../components/AdminPanel/AdminPanelFaculty/FacultyTable";
import {getItem} from "../services/LocaleStorage";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ListItemText from "@mui/material/ListItemText";
import AdminUserTable from "../components/AdminPanel/AdminPanelUser/AdminUserTable";


export default function AdminPanel() {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Utilisateurs en attente" value="1" />
                        <Tab label="Utilisateurs actifs" value="2" />
                        <Tab label="Publications" value="3" />
                        <Tab label="événements" value="4" />
                        <Tab label="Filières" value="5" />
                        {(JSON.parse(atob(getItem('Token').split('.')[1])).roles.some(item => item === 'ROLE_SUPER_ADMIN') && (
                            <Tab label="Admins" value="6" />
                            ))
                            ||
                            null
                        }

                    </TabList>
                </Box>
                <TabPanel value="1">
                    <WaitingUserTable />
                </TabPanel>
                <TabPanel value="2">
                    <ActiveUserTable />
                </TabPanel>
                <TabPanel value="3">
                    <PostTable />
                </TabPanel>
                <TabPanel value="4">
                    <EventTable />
                </TabPanel>
                <TabPanel value="5">
                    <FacultyTable />
                </TabPanel>
                <TabPanel value="6">
                    <AdminUserTable />
                </TabPanel>
            </TabContext>
        </Box>
    );
}