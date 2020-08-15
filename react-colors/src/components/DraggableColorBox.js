import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/DraggableColorBoxStyles';

function DraggableColorBox(props) {
	return (
		<div className={props.classes.root} style={{ backgroundColor: props.color }}>
			{props.color}
		</div>
	);
}

export default withStyles(styles)(DraggableColorBox);
