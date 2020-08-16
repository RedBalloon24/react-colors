import React, { Component } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default class NewPaletteModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			newPaletteName: ''
		};
		this.handleClickOpen = this.handleClickOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
			this.props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
		);
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleClickOpen() {
		this.setState({
			open: true
		});
	}

	handleClose() {
		this.setState({
			open: false
		});
	}

	render() {
		const { open, newPaletteName } = this.state;
		return (
			<div>
				<Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
					Open form dialog
				</Button>
				<Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
					<ValidatorForm onSubmit={() => this.props.handleSubmit(newPaletteName)}>
						<DialogContent>
							<DialogContentText>
								Please enter a name for your new palette. Make sure it is unique.
							</DialogContentText>

							<TextValidator
								label="Palette Name"
								value={newPaletteName}
								name="newPaletteName"
								onChange={this.handleChange}
								margin="normal"
								fullWidth
								validators={[ 'required', 'isPaletteNameUnique' ]}
								errorMessages={[ 'Enter Palette Name', 'Name already used' ]}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={this.handleClose} color="primary">
								Cancel
							</Button>
							<Button variant="contained" color="primary" type="submit">
								Save Palette
							</Button>
						</DialogActions>
					</ValidatorForm>
				</Dialog>
			</div>
		);
	}
}
