import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, CssBaseline, AppBar, Toolbar, Typography, Divider, IconButton, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import styles from '../styles/NewPaletteFormStyles';
import DraggableColorBox from './DraggableColorBox';

class NewPaletteForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: true,
			currentColor: 'red',
			colors: [ { color: 'blue', name: 'blue' } ],
			newName: ''
		};
		this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
		this.handleDrawerClose = this.handleDrawerClose.bind(this);
		this.updateCurrentColor = this.updateCurrentColor.bind(this);
		this.addNewColor = this.addNewColor.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
			this.state.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
		);
		ValidatorForm.addValidationRule('isColorUnique', (value) =>
			this.state.colors.every(({ color }) => color !== this.state.currentColor)
		);
	}

	handleDrawerOpen() {
		this.setState({ open: true });
	}

	handleDrawerClose() {
		this.setState({ open: false });
	}

	updateCurrentColor(newColor) {
		this.setState({ currentColor: newColor.hex });
	}

	addNewColor() {
		const newColor = {
			color: this.state.currentColor,
			name: this.state.newName
		};
		this.setState({ colors: [ ...this.state.colors, newColor ], newName: "" });
	}

	handleChange(e) {
		this.setState({ newName: e.target.value });
	}

	render() {
		const { classes } = this.props;
		const { open } = this.state;
		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open
					})}
				>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={this.handleDrawerOpen}
							edge="start"
							className={clsx(classes.menuButton, open && classes.hide)}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap>
							Create Palette
						</Typography>
					</Toolbar>
				</AppBar>
				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="left"
					open={open}
					classes={{
						paper: classes.drawerPaper
					}}
				>
					<div className={classes.drawerHeader}>
						<IconButton onClick={this.handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<Typography variant="h4">Design Your Palette</Typography>
					<div>
						<Button variant="contained" color="secondary">
							Clear Palette
						</Button>
						<Button variant="contained" color="primary">
							Random Color
						</Button>
					</div>
					<ChromePicker color={this.state.currentColor} onChangeComplete={this.updateCurrentColor} />
					<ValidatorForm onSubmit={this.addNewColor}>
						<TextValidator
							value={this.state.newName}
							onChange={this.handleChange}
							validators={[ 'required', 'isColorNameUnique', 'isColorUnique' ]}
							errorMessages={[ 'Enter a color name', 'Color name must be unique', 'Color already used' ]}
						/>
						<Button
							variant="contained"
							type="submit"
							color="primary"
							style={{ backgroundColor: this.state.currentColor }}
						>
							Add Color
						</Button>
					</ValidatorForm>
				</Drawer>
				<main
					className={clsx(classes.content, {
						[classes.contentShift]: open
					})}
				>
					<div className={classes.drawerHeader} />
					{this.state.colors.map((color) => <DraggableColorBox color={color.color} name={color.name} />)}
				</main>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
