import React, { Component } from 'react';

class Button extends Component {

	render() {
		let { style, onClick, title, tabState, tab, color } = this.props
		return (
			<button onClick={onClick} style={tabState === tab ? {
				...{
					backgroundColor: color,
					border: `2px solid ${color}`,
					color: 'white',
					...styles.defaultButton,
					...style
				}
			} : {
					...{
						backgroundColor: 'white',
						border: `2px solid ${color}`,
						color,
						...styles.defaultButton,
						...style
					}
				}}>
				{title}
			</button>
		);
	}
}

const styles = {
	defaultButton: {
		fontFamily: 'Montserrat',
		fontWeight: 600,
		outline: 'none',
		borderRadius: 20,
		padding: '5px 15px'
	}
}

export default Button;