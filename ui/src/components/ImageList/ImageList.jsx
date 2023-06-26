import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { getListPhoto, createPhoto, removePhoto, getStatus, getStatusMode, postStatusMode } from '../../api';
import { useState, useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import C from '../../C';
import { useSnackbar } from 'react-simple-snackbar'
import CircularProgress from '@mui/material/CircularProgress';


export default function TitlebarImageList() {

    const [image, setImages] = useState([]);
    const [delta, setDelta] = useState([]);
    const [openSnackbar, closeSnackbar] = useSnackbar()
    const [mode, setMode] = useState([])
    const [circular, setCircular] = useState(false)



    const statusMode = () => {
        getStatusMode().then(res => {
            console.log(res)
            setMode(res.message);
        });
    }

    const getData = () => {
        getStatus().then(res => {
            setDelta(res.message);
        });
    }

    useEffect(() => {
        getListPhoto().then(result => {
            setImages(result);
            statusMode()
            getData()
        });

    }, [])

    const downloadPhoto = () => {
        getListPhoto().then(result => {
            setImages(result);
        })
    }

    return (
        <Box sx={{ width: '100%' }} >
            <Box style={{ display: "flex" }}>
                <Button
                    sx={{ margin: '2px' }}
                    variant={mode === "Inventos" ? "contained" : "text"}
                    onClick={() => {
                        setCircular(true)
                        postStatusMode({ "message": "Inventos" }).then(result => {
                            setMode(result.message)
                            setCircular(false)
                        });
                    }}
                >
                    {"Inventos"}
                </Button>
                <Button
                    sx={{ margin: '2px' }}
                    variant={mode === "Detector" ? "contained" : "text"}
                    onClick={() => {
                        setCircular(true)
                        postStatusMode({ "message": "Detector" }).then(result => {
                            setMode(result.message)
                            setCircular(false)
                        });
                    }}
                >
                    {"Detector"}
                </Button>
                <Button
                    sx={{ margin: '2px' }}
                    variant={mode === "Verification" ? "contained" : "text"}
                    onClick={() => {
                        setCircular(true)
                        postStatusMode({ "message": "Verification" }).then(result => {
                            setMode(result.message)
                            setCircular(false)
                        });
                    }}
                >
                    {"Verification"}
                </Button>
                <CircularProgress size="1rem" style={{ display: (circular ? 'block' : 'none'), margin: "12px", }} />
            </Box>
            <Toolbar />
            <Box>
                <Button
                    sx={{ margin: '2px' }}
                    variant="contained"
                    onClick={() => {
                        createPhoto().then(res => {
                            openSnackbar(res.message)
                            getData()
                            downloadPhoto()
                        });
                    }}
                >
                    {"Сделать кадр"}
                </Button>
                <Button
                    sx={{ margin: '2px' }}
                    variant="contained"
                    onClick={() => {
                        removePhoto().then(res => {
                            getData()
                            downloadPhoto()
                        });
                    }}
                >
                    {"Очистить"}
                </Button>
            </Box>
            <Box sx={{ marginTop: '1rem' }}>
                {`Период между кадрами: ${delta}`}
            </Box>
            <ImageList sx={{ width: 1000, height: 350, gap: "2px", margin: 'auto' }}  >
                <ImageListItem key="Subheader" cols={2} rows={1}>
                </ImageListItem>
                {image.map((item) => (
                    <ImageListItem key={item.name}>
                        <img
                            src={`${C.BASE_PATH}/api/download/${item.name}`}

                            alt=""
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={item.name}
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label={`info about ${item.name}`}
                                >
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
            <Toolbar />
        </Box>
    );
}
