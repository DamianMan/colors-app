import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ModalForm from './ModalForm';

const drawerWidth = 400;



const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));




function PaletteFormNav(props) {

    const navigate = useNavigate()
    const { palettes, open, setOpen, openModal, setModal, color, setColor, newPaletteName } = props





    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleOpenModal = () => {
        setModal(true)
    }
    const handleCloseModal = () => {
        setModal(false)
        setColor(st => ({ ...st, newPaletteName: '' }))
    }


    const handleModalSubmit = (emojiPick, evt) => {
        setColor(st => ({
            ...st, newPaletteName: evt.target.value, isFullPalette: false
        }))
        setModal(false)
        let newColors = {
            paletteName: newPaletteName,
            id: newPaletteName.toLocaleLowerCase().replace(/ /g, '-'),
            emoji: emojiPick,
            colors: color.colors
        }

        props.addPalette(newColors)

        navigate('/')

    }
    const handleChangeForm = (evt) => {
        setColor(st => ({ ...st, [evt.target.name]: evt.target.value }))

    }


    const handleBack = () => {
        navigate(-1);
    }
    return (
        <div>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar
                    sx={{
                        backgroundColor: '#cbedf8',
                        color: '#0b0b0b',
                    }}
                >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <AddToPhotosIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Create Palette
                    </Typography>
                    <Box sx={{ marginLeft: 'auto' }}>
                        <Button
                            sx={{
                                margin: '0 3px',
                                '@media screen and (max-width: 600px)': {
                                    fontSize: '0.7em',
                                    margin: '0 3px'
                                }
                            }}
                            variant='contained' color='error' onClick={handleBack}>Go Back</Button>
                        <Button
                            sx={{
                                margin: '0 3px',
                                '@media screen and (max-width: 600px)': {
                                    fontSize: '0.7em',
                                    margin: '0 3px'
                                }
                            }}
                            variant='contained' color='primary' onClick={handleOpenModal}>Save</Button>

                    </Box>
                    <ModalForm
                        openModal={openModal}
                        setModal={setModal}
                        setColor={setColor}
                        handleOpenModal={handleOpenModal}
                        handleCloseModal={handleCloseModal}
                        handleBack={handleBack}
                        handleModalSubmit={handleModalSubmit}
                        newPaletteName={newPaletteName}
                        handleChangeForm={handleChangeForm}
                        palettes={palettes}
                    />


                </Toolbar>
            </AppBar>

        </div>
    );

}

export default PaletteFormNav;