import React, { Component } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

export default class NewPaletteModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stage: 'name',
			newPaletteName: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.showEmojiPicker = this.showEmojiPicker.bind(this);
		this.savePalette = this.savePalette.bind(this);
	}

	componentDidMount() {
		ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
			this.props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
		);
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	showEmojiPicker() {
		this.setState({ stage: 'emoji' });
	}

	savePalette(emoji) {
		const newPalette = {
			paletteName: this.state.newPaletteName,
			emoji: emoji.native
		};
		this.props.handleSubmit(newPalette);
		this.setState({ stage: '' });
	}

	render() {
		const { newPaletteName } = this.state;
		const { hideForm } = this.props;
		return (
			<div>
				<Dialog open={this.state.stage === 'emoji'} onClose={hideForm}>
					<DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
					<Picker title="Pick an Emoji" onSelect={this.savePalette} />
				</Dialog>
				<Dialog open={this.state.stage === 'name'} onClose={hideForm} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
					<ValidatorForm onSubmit={this.showEmojiPicker}>
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
							<Button onClick={hideForm} color="primary">
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
