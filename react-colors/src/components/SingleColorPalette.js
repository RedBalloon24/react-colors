import React, { Component } from 'react'
import ColorBox from './ColorBox';

export default class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this.shades = this.getShades(this.props.palette, this.props.colorId);
        console.log(this.shades);
    }

    getShades(palette, filteredColors) {
        let shades =[];
        let allColors = palette.colors;

        for(let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === filteredColors)
            );
        }
        // return all colors except first shade(50)
        return shades.slice(1);
    }

    render() {
        const colorBoxes = this.shades.map(color => (
            <ColorBox key={color.id} name={color.name} background={color.hex} />
        ))
        return (
            <div className="Palette">
                <h1>single color palette</h1>
                <div className="Palette-colors">{colorBoxes}</div>
            </div>
        )
    }
}
