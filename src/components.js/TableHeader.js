import React, { Component } from 'react'
import upDown from '../images/up-down.svg'

export default class TableHeader extends Component {

	constructor(props) {
		super(props)
		this.state = {
			onOff: -1 //true: asc, false: desc
		}
	}

	sortBy = type => {
		let { studentList, sortList } = this.props
		let { onOff } = this.state
		let newStudentList = [...studentList]
		if (onOff === -1) {
			this.setState({
				onOff: false
			})
		}
		else {
			this.setState({
				onOff: !onOff
			})
		}
		if (onOff === false) {
			if (type === 'score') {
				newStudentList.sort((a, b) => a[type].toString().localeCompare(b[type].toString()))
			}
			else
				newStudentList.sort((a, b) => a[type].localeCompare(b[type]))
		} else {
			if (type === 'score') {
				newStudentList.sort((a, b) => b[type].toString().localeCompare(a[type].toString()))
			}
			else
				newStudentList.sort((a, b) => b[type].localeCompare(a[type]))
			
		}
		sortList(newStudentList)
	}

	render() {
		let { width, title, type } = this.props
		return (
			<th width={width} align='left' style={styles.th}>
				{title}
				<button style={styles.sortButton} onClick={() => this.sortBy(type)}><img src={upDown} width='14' height='14' alt='sort_btn' /></button>
			</th>
		)
	}
}

const styles = {
	sortButton: {
		backgroundColor: 'transparent',
		padding: 2
	},
	th: {
		padding: 0,
		paddingLeft: 25
	}
}
