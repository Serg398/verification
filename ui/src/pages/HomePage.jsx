import * as React from 'react';
import Drawer from '../components/Drawer/Drawer'
import Box from '@mui/material/Box';
import TitlebarImageList from '../components/ImageList/ImageList'
import Toolbar from '@mui/material/Toolbar';
import SnackbarProvider from 'react-simple-snackbar'


export default function Home() {
    return (
        <SnackbarProvider>
            <Box sx={{ display: 'flex' }}>
                <Drawer />
                <Box sx={{ marginTop: '1rem', marginLeft: '1rem' }} >
                    <Toolbar />
                    <TitlebarImageList />
                </Box>
            </Box>
        </SnackbarProvider>
    );
}