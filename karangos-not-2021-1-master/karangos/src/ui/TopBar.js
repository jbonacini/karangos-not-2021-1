import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MainMenu from './MainMenu.js'
import logo from '../img/karangos-logo.png'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	logo: {
		width: '300px'
	}
}));

export default function TopBar() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<MainMenu />
					<img src={logo} alt="Logotipo Karangos" className={classes.logo}/>
				</Toolbar>
			</AppBar>
		</div>
	);
}
