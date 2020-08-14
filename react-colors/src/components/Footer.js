import React from 'react';
import './Footer.css';

function Footer(props) {
	const { paletteName, emoji } = props;

	return (
		<footer className="Footer">
			{paletteName}
			<span className="Footer-emoji">{emoji}</span>
		</footer>
	);
}

export default Footer;
