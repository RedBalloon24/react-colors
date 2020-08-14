import React, { Component } from 'react';
import Palette from './components/Palette';
import { Switch, Route } from 'react-router-dom';
import seedPalettes from './seedPalettes';
import { generatePalette } from './helpers/ColorHelpers';
import PaletteList from './components/PaletteList';
import SingleColorPalette from './components/SingleColorPalette';

class App extends Component {
	findPalette(id) {
		return seedPalettes.find((palette) => {
			return palette.id === id;
		});
	}
	render() {
		return (
			<Switch>
				<Route
					exact
					path="/"
					render={(routeProps) => <PaletteList palettes={seedPalettes} {...routeProps} />}
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
