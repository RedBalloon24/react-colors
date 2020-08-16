import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { generatePalette } from './helpers/ColorHelpers';
import seedPalettes from './seedPalettes';
import Palette from './components/Palette';
import PaletteList from './components/PaletteList';
import SingleColorPalette from './components/SingleColorPalette';
import NewPaletteForm from './components/NewPaletteForm';

class App extends Component {
	constructor(props) {
		super(props);
		const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
		this.state = {
			palettes: savedPalettes || seedPalettes
		};
		this.savePalette = this.savePalette.bind(this);
		this.findPalette = this.findPalette.bind(this);
	}

	findPalette(id) {
		return this.state.palettes.find((palette) => {
			return palette.id === id;
		});
	}

	savePalette(newPalette) {
		this.setState(
			{
				palettes: [ ...this.state.palettes, newPalette ]
			},
			this.syncLocalStorage
		);
	}

	syncLocalStorage() {
		//save palette to local storage
		window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes));
	}

	render() {
		return (
			<Switch>
				<Route
					exact
					path="/palette/new"
					render={(routeProps) => (
						<NewPaletteForm savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps} />
					)}
				/>
				<Route
					exact
					path="/"
					render={(routeProps) => <PaletteList palettes={this.state.palettes} {...routeProps} />}
				/>
				<Route
					exact
					path="/palette/:id"
					render={(routeProps) => (
						<Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />
					)}
				/>
				<Route
					exact
					path="/palette/:paletteId/:colorId"
					render={(routeProps) => (
						<SingleColorPalette
							colorId={routeProps.match.params.colorId}
							palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}
						/>
					)}
				/>
			</Switch>
			// <div className="App">
			//   <Palette palette={generatePalette(seedPalettes[4])} />
			// </div>
		);
	}
}

export default App;
