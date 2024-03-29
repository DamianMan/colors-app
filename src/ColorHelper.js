
import chroma from "chroma-js";



const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

function generatePalette(starterPAlette) {
    let newPaletteArray = []
    let newPalette;
    starterPAlette.forEach(element => {
        newPalette = {
            paletteName: element.paletteName,
            id: element.id,
            emoji: element.emoji,
            colors: {
            }
        }
        newPaletteArray.push(newPalette)
        for (let level of levels) {
            newPalette.colors[level] = []
        }
        for (let color of element.colors) {
            let scale = getScale(color.color, 10).reverse();
            for (let i in scale) {
                newPalette.colors[levels[i]].push({
                    name: `${color.name} ${levels[i]}`,
                    id: color.name.toLowerCase().replace(/ /g, '-'),
                    hex: scale[i],
                    rgb: chroma(scale[i]).css(),
                    rgba: chroma(scale[i]).css().replace('rgb', 'rgba').replace(')', ',1.0)')

                })
            }
        }

    });

    return newPaletteArray

}

function getRange(hexColor) {
    const end = '#ffff'
    return [
        chroma(hexColor)
            .darken(1.4)
            .hex(),
        hexColor,
        end
    ]
}

function getScale(hexColor, numberOfColors) {
    return chroma
        .scale(getRange(hexColor))
        .mode('lab')
        .colors(numberOfColors)
}


export default generatePalette;