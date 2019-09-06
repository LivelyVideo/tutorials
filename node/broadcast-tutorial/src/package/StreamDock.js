import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
	docked: {
		position: 'absolute',
		zIndex: 2,
		width: '33%',
	},
	dockedFixed: {
		width: '177px',
	},
	dockedTopRight: {
		top: '2em',
		right: '2em',
	},
	dockedTopLeft: {
		top: '2em',
		left: '2em',
	},
	dockedBottomRight: {
		bottom: '2em',
		right: '2em',
	},
	dockedBottomLeft: {
		bottom: '2em',
		left: '2em',
	},
	dockedContainer: {
		overflow: 'hidden',
		borderRadius: '4px',
		zIndex: 2,
		width: '100%',
		background: grey[800],
		boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)',
	},
	bottom: {
		marginTop: theme.spacing.unit * 2,
	},
	top: {
		marginBottom: theme.spacing.unit * 2,
	},
	iconButton: {
		color: '#FFF',
		position: 'absolute',
		right: 0,
		bottom: 0,
	}
});

class StreamDock extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		docked: PropTypes.string,
	};

	static defaultProps = {
		docked: false,
	};

	state = {
		fixed: true,
	}

	onClick = () => {
		this.setState(prevState => ({
			fixed: !prevState.fixed,
		}));
	}

	render() {
		const { children, classes, docked } = this.props;
		const { fixed } = this.state;

		const rootClass = cx({
			[classes.docked]: !!docked,
			[classes.dockedFixed]: !!fixed,
			[classes.dockedTopRight]: docked && docked === 'top-right',
			[classes.dockedTopLeft]: docked && docked === 'top-left',
			[classes.dockedBottomRight]: docked && docked === 'bottom-right',
			[classes.dockedBottomLeft]: docked && docked === 'bottom-left',
			[classes.bottom]: docked && (docked === 'bottom-left' || docked === 'bottom-right'),
			[classes.top]: docked && (docked === 'top-left' || docked === 'top-right'),
		});

		const containerClass = cx({
			[classes.dockedContainer]: true,
		});

		if (!docked) {
			return children;
		}

		return (
			<div className={rootClass}>
				{children.length ? children.map((child, i) => (
					<div key={i} className={containerClass}>
						{child}
					</div>
				))
					: <div className={containerClass}>
						{children}
					</div>
				}
				<IconButton className={classes.iconButton} onClick={this.onClick}>
					{ fixed ? <ExpandMoreIcon /> : <ExpandLessIcon/> }
				</IconButton>
			</div>
		);
	}
}

export default withStyles(styles)(StreamDock);