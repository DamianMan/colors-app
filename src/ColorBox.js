import CopyToClipboard from "react-copy-to-clipboard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { styled } from "@mui/system"
import Box from '@mui/material/Box';

import chroma from "chroma-js";
import "./ColorBox.css"


function ColorBox(props) {
    const [state, setSate] = useState({
        copied: false,
    })
    let navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }

    const { backgroundColor, name, id, moreClick } = props;
    const { copied } = state




    const BoxName = styled('span')(
        {
            textTransform: 'uppercase',
            paddingLeft: '5px',
            color: chroma(backgroundColor).luminance() > 0.3 ? 'black' : 'white'
        }
    )


    const CopyButton = styled('button')(
        {
            color: chroma(backgroundColor).luminance() > 0.3 ? 'black' : 'white',
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
        }
    )

    const Span = styled('span')(
        {

            color: chroma(backgroundColor).luminance() > 0.3 ? 'black' : 'white'
        }
    )

    return (


        <CopyToClipboard key={name} text={backgroundColor} onCopy={() => {
            if (name !== 'back') {
                setSate(st => ({ ...st, copied: true }))
                setTimeout(() => {
                    setSate(st => ({ ...st, copied: false }))
                }, 1500)
            }

        }}>

            <Box className="Box-box"
                sx={{
                    backgroundColor: `${backgroundColor}`,
                    height: `${moreClick ? '50%' : '25%'}`,
                    cursor: `${name === 'back' && 'auto'}`,

                    '@media screen and (max-width: 992px)': {
                        width: '50%',
                        height: `${moreClick ? '20%' : '10%'}`
                    },
                    '@media screen and (max-width: 600px)': {
                        width: '100%',
                        height: `${moreClick ? '10%' : '5%'}`
                    },

                }}>
                <div className={`copy-overlay ${copied && 'show'}`} style={{ backgroundColor: `${backgroundColor}` }} />
                <div className="copy-container">
                    <div className={`copied ${copied && 'show'}`}>
                        <h1>Copied!</h1>
                        <Span>{backgroundColor}</Span>
                    </div>
                    {name !== 'back' ? <div className="copy-btn">
                        <CopyButton>COPY</CopyButton>
                    </div> :
                        <div className="copy-btn">
                            <button className="back-button" style={{ opacity: '1' }} onClick={handleBack}>
                                GO BACK
                            </button>
                        </div>
                    }
                    <div className="Box-descr" sx={{ paddingTop: `${moreClick && '30px'}` }}>
                        <BoxName className="Box-name"
                            sx={{
                                color: `${name === 'back' && 'black'}`,
                            }}>
                            {name}

                        </BoxName>
                        {!moreClick && <Span className='Box-more' onClick={(e) => {
                            e.stopPropagation()
                            setSate(st => ({ ...st, moreClick: true }))
                            navigate(`${id}`)
                        }}>
                            MORE
                        </Span>}


                    </div>

                </div>
            </Box>
        </CopyToClipboard>

    );

}

export default ColorBox;