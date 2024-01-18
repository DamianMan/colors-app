import { useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import ColorBox from "./ColorBox";
import Footer from "./Footer";
import "./SinglePalette.css"


function SinglePalette(props) {
    let { paletteId } = useParams();
    const { seedColors } = props;
    const [state, setSate] = useState({
        copied: false,
        color: '',
        level: 500,
        type: 'hex',
        open: false
    });
    const currentPalette = seedColors.find(col => col.id === paletteId)
    const changeLevel = (level) => {

        setSate(st => ({ ...st, level }))
    }

    const onChangeType = (evt) => {
        setSate(st => ({ ...st, type: evt.target.value, open: true }))
    }

    const handleCLick = () => {
        setSate(st => ({ ...st, open: true }))
    }
    const handleCLose = () => {

        setSate(st => ({ ...st, open: false }))
    }


    return (

        <div className="SinglePalette">
            <Navbar
                level={state.level}
                changeLevel={changeLevel}
                onChangeType={onChangeType}
                value={state.type}
                handleClick={handleCLick}
                handleClose={handleCLose}
                open={state.open}
                moreClick={state.moreClick}
            />

            {/* <div className="slider">
                <Slider defaultValue={state.level} min={100} max={900} step={100} onChangeComplete={changeLevel} />

            </div> */}

            <div className="SinglePalette-colors">
                {currentPalette.colors[state.level].map((col) =>
                    <ColorBox
                        key={col.name}
                        id={col.id}
                        backgroundColor={col[state.type]}
                        name={col.name}
                    />


                )}
            </div>

            <Footer paletteName={currentPalette.paletteName} emoji={currentPalette.emoji} />
        </div>

    );
}

export default SinglePalette;

