import React, { Component, Fragment } from 'react';
import './Footer.css';

export default class Footer extends Component {
	render() {
		const { paletteName, emoji } = this.props;
		return (
			<Fragment>
				<footer className="Footer">
					{paletteName}
					<span className="Footer-emoji">{emoji}</span>
				</footer>
			</Fragment>
		);
	}
}
