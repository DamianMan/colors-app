import { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import DeletePaletteDialog from "./DeletePaletteDialog";

import "./Palette.css"

const PaletteHeader = styled('div')({
    position: 'absolute',
    top: '0',
    right: '0',
    opacity: '0',
    padding: '5px',
    backgroundColor: '#f50c0c',
    '&:hover': {
        opacity: '1',
        transition: '0.3s'
    }
})

const PaletteCard = styled('div')({
    width: '350px',
    margin: 'px 5px',
    marginLeft: '50px',
    position: 'relative',

    height: 'auto',
    backgroundColor: 'aliceblue',
    borderRadius: '3px',
    border: ' 1px solid black',
    '@media screen and (max-width: 992px)': {
        width: '350px'
    },


})

const PaletteBox = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60px',
    height: '60px',
    fontSize: '6px',

})

const PaletteFooter = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'black',
    fontWeight: '600',
    padding: '5px 15px'
})

const Pal = memo(function Palette(props) {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();
    const { colors, paletteName, emoji, id, deletePal } = props;

    const deleteColor = (e) => {
        e.stopPropagation()
        setOpen(true)
    }
    const closeDialog = (e) => {
        e.stopPropagation()

        setOpen(false)
    }
    const deletePalette = (e) => {
        e.stopPropagation();
        deletePal(id)
        setOpen(false)


    }
    const handleClick = () => {
        navigate(`/palette/${id}`)

    }
    console.log('Rendering', paletteName)

    return (
        <Box
            sx={{
                display: 'inline-block',
                justifyContent: 'center',
                alignItems: 'center',
                width: '400px',
                p: '5px 5px',
                marginTop: '30px',
                cursor: 'pointer',
                margin: '5px 8px',


            }}
            onClick={handleClick}
        >
            <PaletteCard>
                <PaletteHeader >
                    <DeleteIcon
                        onClick={deleteColor}
                        sx={{ color: '#ffff' }}

                    />
                </PaletteHeader>


                <div className="Palette-card-row row">
                    {colors[500].map((col, i) => <PaletteBox key={col.name} style={{ backgroundColor: `${col.hex}` }}></PaletteBox>)}

                </div>
                <PaletteFooter><span>{paletteName}</span> <span>{emoji}</span></PaletteFooter>

            </PaletteCard>
            <DeletePaletteDialog open={open} onClose={closeDialog} deletePalette={deletePalette} />

        </Box>



    )

}
)
export default Pal;