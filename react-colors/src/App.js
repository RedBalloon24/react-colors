import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { generatePalette } from './helpers/ColorHelpers';
import seedPalettes from './seedPalettes';
import Palette from './components/Palette';
import PaletteList from './components/PaletteList';
import SingleColorPalette from './components/SingleColorPalette';
import NewPaletteForm from './components/NewPaletteForm';

class App extends Component {
	findPalette(id) {
		return seedPalettes.find((palette) => {
			return palette.id === id;
		});
	}
	render() {
		return (
			<Switch>
				<Route exact path="/palette/new" render={() => <NewPaletteForm />} />
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
