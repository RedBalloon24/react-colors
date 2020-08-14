import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import styles from '../styles/PaletteStyles';
import { withStyles } from '@material-ui/styles';

class SingleColorPalette extends Component {
	constructor(props) {
		super(props);
		this.shades = this.getShades(this.props.palette, this.props.colorId);
		this.state = { format: 'hex' };
		this.changeFormat = this.changeFormat.bind(this);
	}

	getShades(palette, filteredColors) {
		let shades = [];
		let allColors = palette.colors;

		for (let key in allColors) {
			shades = shades.concat(allColors[key].filter((color) => color.id === filteredColors));
		}
		// return all colors except first shade(50)
		return shades.slice(1);
	}

	changeFormat(val) {
		this.setState({ format: val });
	}

	render() {
		const { format } = this.state;
		const { paletteName, emoji, id } = this.props.palette;
		const { classes } = this.props;
		const colorBoxes = this.shades.map((color) => (
			<ColorBox key={color.name} name={color.name} background={color[format]} isFullPalette={false} />
		));
		return (
			<div className={classes.Palette}>
				<Navbar handleFormatChange={this.changeFormat} isAllColors={false} />
				<div className={classes.colors}>
					{colorBoxes}
					<div className={classes.goBack}>
						<Link to={`/palette/${id}`}>GO BACK</Link>
					</div>
				</div>
				<Footer paletteName={paletteName} emoji={emoji} />
			</div>
		);
	}
}

export default withStyles(styles)(SingleColorPalette);
