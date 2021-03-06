import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	withStyles,
	Dialog,
	DialogTitle,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Button
} from '@material-ui/core';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { blue, red } from '@material-ui/core/colors';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import MiniPalette from './MiniPalette';
import styles from '../styles/PaletteListStyles';

class PaletteList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openDeleteDialog: false,
			deletingId: ''
		};
		this.openDialog = this.openDialog.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.goToPalette = this.goToPalette.bind(this);
		this.reset = this.reset.bind(this);
	}

	goToPalette(id) {
		this.props.history.push(`/palette/${id}`);
	}

	openDialog(id) {
		this.setState({
			openDeleteDialog: true,
			deletingId: id
		});
	}

	closeDialog() {
		this.setState({
			openDeleteDialog: false,
			deletingId: ''
		});
	}

	handleDelete() {
		this.props.deletePalette(this.state.deletingId);
		this.closeDialog();
	}

	reset() {
		window.localStorage.clear();
		window.location.reload();
	}

	render() {
		const { palettes, classes } = this.props;
		const { openDeleteDialog } = this.state;
		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>
						<h1 className={classes.heading}>React Colors</h1>
						<Link to="/palette/new">Create Palette</Link>
					</nav>
					{palettes <= 0 && (
						<div className={classes.resetContainer}>
							<h1>Restore Pre-Installed Palettes?</h1>
							<div className={classes.buttonContainer}>
								<Button
									variant="contained"
									className={classes.resetButton}
									style={{ backgroundColor: blue[600] }}
									onClick={this.reset}
								>
									<SettingsBackupRestoreIcon fontSize="large" />
								</Button>
							</div>
						</div>
					)}
					<TransitionGroup className={classes.palettes}>
						{palettes.map((palette) => (
							<CSSTransition key={palette.id} classNames="fade" timeout={500}>
								<MiniPalette
									{...palette}
									goToPalette={this.goToPalette}
									openDialog={this.openDialog}
									key={palette.id}
									id={palette.id}
								/>
							</CSSTransition>
						))}
					</TransitionGroup>
				</div>
				<Dialog open={openDeleteDialog} aria-labelledby="delete-dialog-title" onClose={this.closeDialog}>
					<DialogTitle id="delete-dialog-title">Delete Palette?</DialogTitle>
					<List>
						<ListItem button onClick={this.handleDelete}>
							<ListItemAvatar>
								<Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
									<CheckIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Delete" />
						</ListItem>
						<ListItem button onClick={this.closeDialog}>
							<ListItemAvatar>
								<Avatar style={{ backgroundColor: red[100], color: red[600] }}>
									<CloseIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Cancel" />
						</ListItem>
					</List>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(PaletteList);
