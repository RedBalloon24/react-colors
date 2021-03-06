import sizes from '../helpers/sizes';
import bg from './bg.svg';

export default {
	'@global': {
		'.fade-exit-active': {
			opacity: 0,
			transition: 'opacity 500ms ease-out'
		}
	},
	root: {
		height: '100vh',
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'center',
		/* background by SVGBackgrounds.com */
		backgroundColor: '#064cd5',
		backgroundImage: `url(${bg})`,
		overflow: 'auto'
	},
	heading: {
		fontSize: '2rem'
	},
	container: {
		width: '50%',
		display: 'flex',
		alignItems: 'flex-start',
		flexDirection: 'column',
		flexWrap: 'wrap',
		[sizes.down('xl')]: {
			width: '80%'
		},
		[sizes.down('xs')]: {
			width: '75%'
		}
	},
	nav: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		color: 'white',
		'& a': {
			color: 'white'
		}
	},
	palettes: {
		boxSizing: 'border-box',
		width: '100%',
		display: 'grid',
		gridTemplateColumns: 'repeat(3, 30%)',
		gridGap: '2.5rem',
		[sizes.down('md')]: {
			gridTemplateColumns: 'repeat(2, 50%)'
		},
		[sizes.down('xs')]: {
			gridTemplateColumns: 'repeat(1, 100%)',
			gridGap: '1.4rem'
		}
	},
	resetContainer: {
		alignSelf: 'center',
		marginTop: '15%',
		backgroundColor: 'white',
		padding: '15%',
		"& h1": {
			fontSize: '1rem'
		}
	},
	buttonContainer: {
		display: 'flex', 
		justifyContent: 'center'
	},
	resetButton: { 
		color: 'white',
		cursor: 'pointer'
	}
};
