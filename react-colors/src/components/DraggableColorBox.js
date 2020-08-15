import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete'
import styles from '../styles/DraggableColorBoxStyles';

function DraggableColorBox(props) {
	const { classes, color, name } = props;
	return (
		<div className={classes.root} style={{ backgroundColor: color }}>
			<div className={classes.boxContent}>
				<span>{name}</span>
				<span><DeleteIcon className={classes.deleteIcon} /></span>
			</div>
		</div>
	);
}

export default withStyles(styles)(DraggableColorBox);
