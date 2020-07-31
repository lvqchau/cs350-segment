import React, { Component } from 'react';
import { COLORS } from '../../constants/color';
import Checkbox from '../../components.js/Checkbox'

class CategorySelector extends Component {

	constructor(props) {
		super(props)
		this.state = {
			options: [...this.props.courses]
		}
	}

	showCount = (courseArr) => {
		return courseArr.length
	}

	filterCourse = (checked, course) => {
		const { sortList, originalList } = this.props
		const { options } = this.state
		let newOption = [...options]
		let newStudentList = [...originalList]
		if (checked) {
			newOption.push(course)
		} else {
			newOption = newOption.filter(item => item !== course)
		}

		newStudentList = newStudentList.filter(student => {
			let index = -1
			newOption.every((itemCourse, idx) => {
				if (student.courseId === itemCourse) {
					index = idx
					return false
				} else {
					return true
				}
			})
			if (index !== -1)
				return student
		})
		sortList(newStudentList)

		this.setState({
			options: [...newOption]
		})
	}

	showCourse = (courseArr) => {
		return courseArr.map((course, index) => {
			return (
				<div key={index} style={styles.checkbox}>
					<Checkbox index={index} course={course} filterCourse={this.filterCourse} />
				</div>
			)
		})
	}

	render() {
		let { courses } = this.props
		return (
			<div>
				<p style={styles.courseHeading}>Filter by CourseId</p>
				<p style={styles.miniCourse}>{this.showCount(courses)} courses</p>
				<div style={styles.courseContainer}>
					{this.showCourse(courses)}
				</div>
			</div>
		);
	}
}

const styles = {
	courseHeading: {
		color: COLORS.primary
	},
	miniCourse: {
		fontSize: 12,
		color: 'gray'
	},
	courseContainer: {
		marginLeft: 20
	},
	checkbox: {
		padding: '5px 0'
	}
}

export default CategorySelector;