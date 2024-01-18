import PaletteList from "./PaletteList";
import "./Home.css"

function Home(props) {
    const { seedColors, deletePalette } = props

    return (
        <div className="Home">
            <PaletteList seedColors={seedColors} deletePalette={deletePalette} />
        </div>
    )

}

export default Home