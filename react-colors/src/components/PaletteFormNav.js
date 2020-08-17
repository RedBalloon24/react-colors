import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { CssBaseline, AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import clsx from 'clsx';
import NewPaletteModal from './NewPaletteModal';
import styles from '../styles/PaletteFormNavStyles';

class PaletteFormNav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newPaletteName: '',
			formShowing: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.showForm = this.showForm.bind(this);
		this.hideForm = this.hideForm.bind(this);
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	showForm() {
		this.setState({
			formShowing: true
		});
	}

	hideForm() {
		this.setState({
			formShowing: false
		});
	}

	render() {
		const { classes, open, palettes, handleSubmit, handleDrawerOpen } = this.props;
		const { formShowing } = this.state;
		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
					color="default"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open
					})}
				>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							className={clsx(classes.menuButton, open && classes.hide)}
						>
							<EditIcon />
						</IconButton>
						<Typography variant="h6" color="inherit" noWrap>
							Create A Palette
						</Typography>
					</Toolbar>
					<div className={classes.navBtns}>
						<Link to="/">
							<Button variant="contained" color="secondary" className={classes.button}>
								Go Back
							</Button>
						</Link>
						<Button variant="contained" color="primary" className={classes.button} onClick={this.showForm}>
							Save
						</Button>
					</div>
				</AppBar>
				{formShowing && (
					<NewPaletteModal palettes={palettes} handleSubmit={handleSubmit} hideForm={this.hideForm} />
				)}
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
