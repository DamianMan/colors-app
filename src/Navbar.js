import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/system'

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css'


function Navbar(props) {

    const { moreClick, level, changeLevel, value, onChangeType, open, handleClose } = props;

    const Header = styled('header')({
        display: 'flex',
        '@media screen and (max-width: 600px)': {
            height: '80px',
            '.logo': {
                display: 'none'
            },
            '.slider': {
                width: '150px',
            },
            '.level span': {
                fontSize: '0.9em'
            }
        }


    })

    return (
        <Header>
            <div className='logo'>
                <Link to='/'>
                    reactcolorpicker
                </Link>

            </div>
            {!moreClick && <div className='slider-level'>
                <div className='level'>
                    <span>Level: {level}</span>

                </div>

                <div className="slider">
                    <Slider defaultValue={level} min={100} max={900} step={100} onChangeComplete={changeLevel} />
                </div>
            </div>}
            <div className='select-container'>
                <Select
                    className='select'
                    value={value}
                    onChange={onChangeType}
                >
                    <MenuItem value='hex'>HEX - #ffff</MenuItem>
                    <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
                    <MenuItem value='rgba'>RGBA - rgba(255,255,255,1.0)</MenuItem>

                </Select>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    autoHideDuration={3000}
                    open={open}
                    message={<span id='message-id'>Format Changed to {value.toUpperCase()}!</span>}
                    ContentProps={{
                        'aria-describedby': 'message-id'
                    }}
                    action={[
                        <IconButton onClick={handleClose} color='inherit' >
                            <CloseIcon />
                        </IconButton>
                    ]}
                    onClose={handleClose}
                />

            </div>

        </Header>
    );

}

export default Navbar;