import React, { Component } from 'react';
import { COLORS } from '../../constants/color';

class StudentItem extends Component {
	render() {
		let { id, student } = this.props
		let { studentId, fullname, courseId, score } = student
		return (
			<tr style={styles.tr}>
				<td style={styles.td} width='10%' align='left'>{id}</td>
				<td style={styles.td} width='20%' align='left'>{studentId}</td>
				<td style={styles.td} width='35%' align='left'>{fullname}</td>
				<td style={styles.td} width='20%' align='left'>{courseId}</td>
				<td style={styles.td} width='15%' align='left'>{parseFloat(score).toFixed(1)}</td>
			</tr>
		);
	}
}

const styles = {
	tr: {
		backgroundColor: COLORS.lightblue,
		color: 'black',
		display: 'table',
		width: '100%',
		tableLayout: 'fixed',
		marginBottom: 15
	},
	td: {
		padding: 0,
		paddingLeft: 25
	}
}

export default StudentItem;