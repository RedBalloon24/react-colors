import chroma from 'chroma-js';

function generatePalette(starterPalette) {
    const levels = [ 50, 100, 200, 300, 400, 500, 600, 700, 800, 900 ];
	// create new palette
	let newPalette = {
		paletteName: starterPalette.paletteName,
		id: starterPalette.id,
		emoji: starterPalette.emoji,
		colors: {}
	};
	// build new color object of each level
	for (let level of levels) {
		newPalette.colors[level] = [];
	}
	// find level inside of newPalette.colors array and push color data into it
	for (let color of starterPalette.colors) {
        let scale = generateScale(color.color, 10).reverse();
        for(let i in scale) {
            newPalette.colors[levels[i]].push({
                name: `${color.name} ${levels[i]}`,
                id:  color.name.toLowerCase().replace(/ /g, "-"),
                hex: scale[i],
                rgb: chroma(scale[i]).css(),
                rgba: chroma(scale[i]).css().replace("rgb", "rgba").replace(")", ",1.0)")
            })
        }
    }
    return newPalette;
}

// create a range of colors from darkened-color to color to white
function generateRange(hexColor) {
	const end = '#fff';
	return [ chroma(hexColor).darken(1.4).hex(), hexColor, end ];
}
// create color scale
function generateScale(hexColor, numberOfColors) {
	return chroma.scale(generateRange(hexColor)).mode('lab').colors(numberOfColors);
}


export { generatePalette };