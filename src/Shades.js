import { useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import ColorBox from "./ColorBox";
import Footer from "./Footer";
import './Shades.css'

function Shades(props) {
    let { paletteId, colorId } = useParams();
    const { seedColors } = props
    const [state, setShades] = useState({
        copied: false,
        color: '',
        type: 'hex',
        open: false,
        moreClick: true,
    })
    const currentPalette = seedColors.find(item => item.id === paletteId)

    const shadesItem = []

    for (let col in currentPalette.colors) {
        let item = currentPalette.colors[col].find(item => item.id === colorId)
        shadesItem.push(item)

    }
    shadesItem.shift();
    shadesItem.push({ name: 'back', id: 'black', hex: '#000000', rgb: 'rgb(0, 0, 0)', rgba: 'rgba(0, 0, 0, 1.0)' })
    console.log(shadesItem)


    const changeLevel = (level) => {

        setShades(st => ({ ...st, level }))
    }

    const onChangeType = (evt) => {
        setShades(st => ({ ...st, type: evt.target.value, open: true }))
    }

    const handleCLick = () => {
        setShades(st => ({ ...st, open: true }))
    }
    const handleCLose = () => {

        setShades(st => ({ ...st, open: false }))
    }

    return (
        <div className="Shades">
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

            <div className="Shades-colors">
                {shadesItem.map((col) =>
                    <ColorBox
                        key={col.name}
                        id={col.id}
                        backgroundColor={col[state.type]}
                        name={col.name}
                        moreClick={state.moreClick}
                    />


                )}
            </div>

            <Footer paletteName={currentPalette.paletteName} emoji={currentPalette.emoji} />
        </div>

    );

}

export default Shades;
