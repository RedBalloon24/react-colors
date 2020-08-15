import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, CssBaseline, AppBar, Toolbar, Typography, Divider, IconButton, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import styles from '../styles/NewPaletteFormStyles';
import { ChromePicker } from 'react-color';

class NewPaletteForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      open: true, 
      currentColor: "burgundy",
      colors: ["blue", "#e15764" ]
    };
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.updateCurrentColor = this.updateCurrentColor.bind(this);
    this.addNewColor = this.addNewColor.bind(this);

  }

	handleDrawerOpen() {
		this.setState({ open: true });
	};

	handleDrawerClose() {
		this.setState({ open: false });
	};

  updateCurrentColor(newColor) {
    this.setState({ currentColor: newColor.hex })
  }

  addNewColor() {
    this.setState({ colors: [...this.state.colors, this.state.currentColor] });
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
            <Button variant="contained" color="secondary">Clear Palette</Button>
            <Button variant="contained" color="primary">Random Color</Button>
          </div>
          <ChromePicker 
            color={this.state.currentColor} 
            onChangeComplete={this.updateCurrentColor}
          />
          <Button 
            variant="contained" 
            color="primary" 
            style={{ backgroundColor: this.state.currentColor }}
            onClick={this.addNewColor}
          >
            Add Color
          </Button>
				</Drawer>
				<main
					className={clsx(classes.content, {
						[classes.contentShift]: open
					})}
				>
					<div className={classes.drawerHeader} />
          <ul>
            {this.state.colors.map(color => (
              <li style={{ backgroundColor: color}}>{color}</li>
            ))} 
          </ul>
				</main>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
