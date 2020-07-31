import React, { Component } from 'react';
import Button from '../../components.js/Button'
import { COLORS } from '../../constants/color';

class ActionContainer extends Component {

	constructor(props) {
		super(props)
		this.state = {
			tabState: 0,
			form: {
				from0: 1,
				to0: 2,
				from1: 1,
				to1: 3,
				from2: 1,
				to2: 4,
				stuId: '1751012',
				courseId: 'CS422',
				newScore: '7.0',
			},
			error: ''
		}
	}

	opSegmentTree(tabState) {
		const { form } = this.state
		const { studentList, opSegmentTree, updateSegmentTree } = this.props
		if (tabState === 0) { //max
			opSegmentTree(parseInt(form.from0)-1, parseInt(form.to0)-1, studentList, 'max')
		} else if (tabState === 1) { //min
			opSegmentTree(parseInt(form.from1)-1, parseInt(form.to1)-1, studentList, 'min')
		} else if (tabState === 2) { //sum-avg
			opSegmentTree(parseInt(form.from2)-1, parseInt(form.to2)-1, studentList, 'sum')
		} else { //update
			let idxStudent = studentList.findIndex(student => student.studentId === form.stuId && student.courseId === form.courseId)
			if (idxStudent === -1) {
				this.setState({ error: '*Student not found' })
			} else {
				this.setState({ error: '' })
				updateSegmentTree(idxStudent, studentList[idxStudent].score, parseFloat(form.newScore), studentList)
			}
		}
	}

	tabSelect(tab) {
		this.setState({
			tabState: tab,
			error: ''
		})
	}

	renderResult(tabState) {
		switch (tabState) {
			case 0: return (
				<div style={{ marginTop: 10 }}>
					<div style={{ ...styles.resultFlex, marginBottom: 5 }}>
						<p>Score: </p>
						<p style={styles.resultTextLeft}>{this.props.max}</p>
					</div>
				</div>
			)
			case 1: return (
				<div style={{ marginTop: 10 }}>
					<div style={{ ...styles.resultFlex, marginBottom: 5 }}>
						<p>Score: </p>
						<p style={styles.resultTextLeft}>{this.props.min}</p>
					</div>
				</div>
			)
			case 2: return (
				<div style={{ marginTop: 10 }}>
					<div style={styles.resultFlex}>
						<p>Average score: </p>
						<p style={styles.resultTextLeft}>{this.props.avg}</p>
					</div>
				</div>
			)
			case 3: return (
				<div style={{ marginTop: 10 }}>
					<div style={styles.resultFlex}>
						<p>Score updated from
							<span style={styles.resultText}> {this.props.curVal}</span> to
							<span style={styles.resultText}> {this.props.newVal}</span> successfully
						</p>
					</div>
				</div>
			)
			default: return <></>
		}
	}

	updateField = (e, tabState) => {
    this.setState({
			form: {
				...this.state.form,
				[e.target.name]: e.target.value
			}
    }, () => this.renderForm(tabState));
	}	

	renderForm(tabState) {
		switch (tabState) {
			case 0:
			case 1:
			case 2: return (
				<form>
					<label style={styles.label} htmlFor={`from${tabState}`}>From</label>
					<input style={styles.input} name={`from${tabState}`} type='number' value={this.state.form[`from${tabState}`]} onChange={e=>this.updateField(e, tabState)}/> <br />
					<label style={styles.label} htmlFor={`to${tabState}`}>To</label>
					<input style={styles.input} name={`to${tabState}`} type='number' value={this.state.form[`to${tabState}`]} onChange={e=>this.updateField(e, tabState)}/>
					<button type='button' style={styles.submitButton} onClick={() => this.opSegmentTree(tabState)}>Find</button>
				</form>
			)
			case 3: return (
				<form>
					<label style={styles.label} htmlFor='stuId'>StudentID</label>
					<input style={{...styles.input, ...styles.inputString}} name='stuId' type='text' value={this.state.form.stuId} onChange={e=>this.updateField(e, tabState)}/> <br />
					<label style={styles.label} htmlFor='courseId'>CourseID</label>
					<input style={{...styles.input, ...styles.inputString}} name='courseId' type='text' value={this.state.form.courseId} onChange={e=>this.updateField(e, tabState)}/> <br />
					<label style={styles.label} htmlFor='newScore'>New score</label>
					<input style={styles.input} name='newScore' type='text' value={this.state.form.newScore} onChange={e=>this.updateField(e, tabState)}/>
					<button type='button' style={styles.submitButton} onClick={() => this.opSegmentTree(tabState)} >Update</button>
				</form>
			)
			default: return <></>
		}
	}

	render() {
		let { tabState } = this.state
		return (
			<div>
				<div style={styles.flexContainer}>
					<Button color={COLORS.green} tab={0} tabState={tabState} style={styles.marginRight} title='Find highest score' onClick={() => this.tabSelect(0)} />
					<Button color={COLORS.purple} tab={1} tabState={tabState} style={styles.marginRight} title='Find smallest score' onClick={() => this.tabSelect(1)} />
					<Button color={COLORS.orange} tab={2} tabState={tabState} style={styles.marginRight} title='Calculate average score' onClick={() => this.tabSelect(2)} />
					<Button color={COLORS.dark} tab={3} tabState={tabState} style={styles.marginRight} title='Update score' onClick={() => this.tabSelect(3)} />
				</div>
				<div style={styles.flexContainer}>
					<div style={styles.boxContainer}>
						{this.renderForm(tabState)}
					</div>
					<div style={styles.resultContainer}>
						<p style={styles.primaryText}>Result</p>
						{this.renderResult(tabState)}
					</div>
					<p style={styles.errorText}>{this.state.error}</p>
				</div>
			</div>
		);
	}
}

const styles = {
	flexContainer: {
		display: 'flex',
		marginBottom: 15,
		position: 'relative'
	},
	marginRight: {
		marginRight: 15
	},
	boxContainer: {
		width: 336,
		height: 150,
		backgroundColor: 'white',
		boxShadow: '0px 0px 4px 1px rgba(0,0,0,0.1)',
		borderRadius: 10,
		marginRight: 20,
		padding: '10px 20px',
		position: 'relative'
	},
	resultContainer: {
		boxShadow: 'none',
		padding: 0,
		width: 336,
		height: 150,
		marginRight: 20
	},
	label: {
		marginRight: 10
	},
	input: {
		fontSize: 18,
		color: COLORS.primary,
		outline: 'none',
		border: 'none',
		borderBottom: '1px solid black',
		width: 50,
		marginBottom: 10
	},
	inputString: {
		width: 100
	},
	submitButton: {
		fontFamily: 'Montserrat',
		fontWeight: 600,
		borderRadius: 20,
		backgroundColor: COLORS.primary,
		color: 'white',
		padding: '8px 18px',
		position: 'absolute',
		bottom: 10,
		right: 10
	},
	errorText: {
		color: 'red',
		fontSize: 12,
		position: 'absolute',
		left: 0,
		bottom: -20
	},
	primaryText: {
		color: COLORS.primary
	},
	resultText: {
		color: COLORS.primary,
		fontSize: 18,
		margin: '0 5px'
	},
	resultTextLeft: {
		color: COLORS.primary,
		fontSize: 18,
		marginLeft: 10
	},
	resultFlex: {
		display: 'flex',
		alignItems: 'baseline'
	}
}

export default ActionContainer;