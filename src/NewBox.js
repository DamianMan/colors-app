import { Box } from "@mui/system";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { styled } from '@mui/material/styles';
import { SortableElement } from "react-sortable-hoc";

import "./NewBox.css"





const NewBox = SortableElement((props) => {

    const { color, name } = props


    const Name = styled('div')(({ theme }) => ({
        color: theme.palette.getContrastText(color),
        backgroundColor: color,
        textTransform: 'uppercase',


    }));

    const handleClick = () => {
        console.log('delete')
        props.deleteBtn(name)
    }

    return (
        <Box
            className='NewBox-main'
            sx={{
                width: '20%',
                height: '25%',
                display: 'inline-block',
                position: 'relative',
                cursor: 'pointer',
                margin: '0 auto',
                marginBottom: '-6.5px',
                backgroundColor: `${color}`,
                '@media screen and (max-width: 992px)': {
                    width: '50%',
                    height: ' 10%'
                },
                '@media screen and (max-width: 600px)': {
                    width: '100%',
                    height: '5%'
                }

            }} >
            <Box
                className='NexBox-content'
                sx={{
                    padding: '10px',
                    position: 'absolute',
                    bottom: '0',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',

                }}>
                <Name>{name}</Name>
                <DeleteForeverIcon className="NewBox-delete" onClick={handleClick} />

            </Box>
        </Box>
    );

})

export default NewBox;