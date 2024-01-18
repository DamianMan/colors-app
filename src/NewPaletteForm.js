import { useState } from 'react';
import { styled } from '@mui/material/styles';
import PaletteFormNav from './PaletteFormNav';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button } from '@mui/material';
import { useRef } from 'react';
import DraggableColorList from './DraggableColorList';
import { arrayMoveImmutable } from 'array-move';
import ColorPickerForm from './ColorPickerForm';

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        height: 'calc(100vh - 64px)',
        padding: '0',
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);



const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


const ColorsContainer = styled('div')({
    height: ' 90%'

})

const ColorFormStyle = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '90%',
    height: '100%'
})


let colorUnique = new Set()


export default function NewPaletteForm(props) {

    const [openModal, setModal] = useState(false)
    const [open, setOpen] = useState(false);
    const inputRef = useRef(null);

    const { palettes, addPalette } = props


    const [color, setColor] = useState({
        currentColor: '#06ee91',
        colorToAdd: '',
        newPaletteName: '',
        colors: [],

    })

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleChange = (color, event) => {
        setColor(st => ({ ...st, currentColor: color.hex }))
    };

    const handleSubmit = () => {
        setColor(st => ({
            ...st,
            colors: [...st.colors, {
                name: st.colorToAdd,
                color: st.currentColor
            }],

            colorToAdd: ''
        }))

    }

    const handleDeleteBtn = (idx) => {
        colorUnique.delete(idx)
        console.log(colorUnique)

        setColor(st => ({
            ...st, colors: st.colors.filter((col) => col.name !== idx)
        }))


    }

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setColor(st => ({
            ...st,
            colors: arrayMoveImmutable(st.colors, oldIndex, newIndex),
        }));
    };

    const handleClearBtn = () => {

        colorUnique = new Set()

        setColor(st => ({
            ...st,
            colors: [],
            isFullPalette: false
        }))
    }
    const handleChangeForm = (evt) => {
        setColor(st => ({ ...st, [evt.target.name]: evt.target.value }))

    }


    const handleRandomBtn = () => {
        let randomPalette = Math.floor(Math.random() * palettes.length)
        let randomColor = Math.floor(Math.random() * palettes[randomPalette].colors.length)
        let name = palettes[randomPalette].colors[randomColor].name.toLowerCase()


        if (colorUnique.has(name)) {
            console.log(name)
            console.log(colorUnique)
            while (colorUnique.has(name)) {
                randomColor = Math.floor(Math.random() * palettes[randomPalette].colors.length)
                name = palettes[randomPalette].colors[randomColor].name.toLowerCase()
            }
            console.log(name)
        }

        colorUnique.add(name)
        let color = palettes[randomPalette].colors[randomColor].color

        setColor(st => ({
            currentColor: color,
            colors: [...st.colors, { name: name, color: color }]
        }))

    }

    let isFull = color.colors.length >= 20


    return (
        <Box sx={{ display: 'flex' }}>
            <PaletteFormNav
                open={open}
                setOpen={setOpen}
                openModal={openModal}
                setModal={setModal}
                setColor={setColor}
                color={color}
                newPaletteName={color.newPaletteName}
                addPalette={addPalette}
                palettes={palettes}
            />

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center'
                    },

                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader sx={{ marginLeft: 'auto' }}>
                    <IconButton onClick={handleDrawerClose} >
                        <ChevronLeftIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <ColorFormStyle>
                    <Typography variant='h4'>Design Your Palette</Typography>
                    <div>

                        <Button variant='contained' color='error' onClick={handleClearBtn} >Clear PAlette</Button>
                        <Button variant='contained' color='primary' onClick={handleRandomBtn} disabled={isFull}>Random Color</Button>
                    </div>
                    <ColorPickerForm
                        colors={color.colors}
                        onChangeComplete={handleChange}
                        handleSubmit={handleSubmit}
                        value={color.colorToAdd}
                        handleChange={handleChangeForm}
                        currentColor={color.currentColor}
                        isFull={isFull}
                    />

                </ColorFormStyle>


            </Drawer>
            <Main
                open={open}>
                <DrawerHeader />
                <ColorsContainer>
                    <DraggableColorList
                        ref={inputRef}
                        colors={color.colors}
                        delete={handleDeleteBtn}
                        axis='xy'
                        onSortEnd={onSortEnd}
                        distance={20}
                    />
                </ColorsContainer>




            </Main>
        </Box>
    );
}

