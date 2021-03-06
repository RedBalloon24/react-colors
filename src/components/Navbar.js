import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MenuItem, Snackbar, IconButton, withStyles } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import CloseIcon from '@material-ui/icons/Close';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from '../styles/NavbarStyles';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = { format: 'hex', open: false };
		this.handleFormatChange = this.handleFormatChange.bind(this);
		this.closeSnackbar = this.closeSnackbar.bind(this);
	}

	handleFormatChange(e) {
		this.setState({ format: e.target.value, open: true });
		this.props.handleFormatChange(e.target.value);
	}

	closeSnackbar() {
		this.setState({ open: false });
	}

	render() {
		const { level, changeLevel, isAllColors, classes } = this.props;
		const { format, open } = this.state;
		return (
			<header className={classes.Navbar}>
				<div className={classes.logo}>
					<Link to="/">ReactColorPicker</Link>
				</div>
				{isAllColors && (
					<div>
						<span>Level: {level}</span>
						<div className={classes.slider}>
							<Slider defaultValue={level} min={100} max={900} step={100} onAfterChange={changeLevel} />
						</div>
					</div>
				)}
				<div className={classes.selectContainer}>
					<Select value={format} onChange={this.handleFormatChange} className={classes.select}>
						<MenuItem value="hex">HEX - #fffff</MenuItem>
						<MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
						<MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
					</Select>
				</div>
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
					open={open}
					autoHideDuration={3000}
					message={<span id="message-id">Format Changed to {format.toUpperCase()}</span>}
					ContentProps={{
						'aria-describedby': 'message-id'
					}}
					onClose={this.closeSnackbar}
					action={[
						<IconButton onClick={this.closeSnackbar} color="inherit" key="close" aria-label="close">
							<CloseIcon />
						</IconButton>
					]}
				/>
			</header>
		);
	}
}

export default withStyles(styles)(Navbar);
