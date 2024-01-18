import Palette from "./Palette";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./PaletteList.css"


function PaletteList(props) {
    const { seedColors, deletePalette } = props

    return (
        <div className="PaletteList-title">
            <div className="PaletteList-head">
                <div className="PaletteList-header" >React Colors</div>
                <div className="PaletteList-create"><Link to={'/palette/new'}>Create Palette</Link></div>
            </div>

            <TransitionGroup className="row PaletteList">
                {seedColors.map((col, i) =>

                    <CSSTransition
                        key={col.id}
                        timeout={800}
                        classNames='fade'

                    >

                        <Palette
                            className='col-lg-4 PaletteList-link'
                            id={col.id}
                            seedColors={seedColors}
                            paletteName={col.paletteName}
                            emoji={col.emoji}
                            colors={col.colors}
                            deletePal={deletePalette}

                        />
                    </CSSTransition>

                )}
            </TransitionGroup>



        </div>

    )

}

export default PaletteList;