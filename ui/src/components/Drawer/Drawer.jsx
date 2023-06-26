import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const menu = [
    { id: 'peers', name: 'Фото', icon: <MailIcon />, to: '/' },
    { id: 'users', name: 'Информация', icon: <MailIcon />, to: '/dashboard/users' },
]

export default function ClippedDrawer() {

    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Поверочное ПО
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {menu.map(({ id, name, icon, to }) => (
                            <ListItem key={id} disablePadding>
                                <ListItemButton
                                    onClick={() => {
                                        navigate(to);
                                        console.log()
                                    }}>
                                    <ListItemIcon>
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText >
                                        {name}
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}