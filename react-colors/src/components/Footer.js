import React from 'react';
import styles from '../styles/FooterStyles';
import { withStyles } from '@material-ui/styles';

function Footer(props) {
	const { paletteName, emoji, classes } = props;

	return (
		<footer className={classes.Footer}>
			{paletteName}
			<span className={classes.emoji}>{emoji}</span>
		</footer>
	);
}

export default withStyles(styles)(Footer);
