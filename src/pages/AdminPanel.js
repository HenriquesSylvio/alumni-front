import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import {Tabs} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import React from 'react';
import UserTable from "../components/AdminPanel/AdminPanelUser/UserTable";


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
                        <Tab label="Utilisateur" value="1" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <UserTable />
                </TabPanel>
            </TabContext>
        </Box>
    );
}