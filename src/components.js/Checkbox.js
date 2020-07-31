import React, { Component } from 'react'

export default class Checkbox extends Component {

	constructor(props) {
		super(props)
		this.state = {
			isChecked: true
		}
	}

	checkCourse = (course) => {
		let { filterCourse } = this.props
		this.setState({
			isChecked: !this.state.isChecked
		}, filterCourse(!this.state.isChecked, course))

	}

	render() {
		let { index, course } = this.props
		return (
			<>
				<input checked={this.state.isChecked} type='checkbox' id={`course${index + 1}`} name={`course${index + 1}`} value={course} onChange={() => this.checkCourse(course)} />
				<label style={styles.label} htmlFor={`course${index + 1}`}>{course}</label>
			</>
		)
	}
}

const styles = {
	label: {
		paddingLeft: 5,
		fontSize: 14
	}
}