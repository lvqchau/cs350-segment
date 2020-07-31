import React, { Component } from 'react'
import { connect } from 'react-redux'
import CategorySelector from './components/CategorySelector'
import ActionContainer from './components/ActionContainer'
import StudentTable from './components/StudentTable'

class GradeBook extends Component {

	constructor(props) {
		super(props)
		this.state = {
			studentList: this.props.studentList,
			tree: []
		}
		this.props.buildSegmentTree(this.props.studentList)
	}

	sortList = (studentList) => {
		this.setState({ studentList })
		this.props.buildSegmentTree(studentList)
	}

	render() {
		let { studentList, courses, updateSegmentTree, opSegmentTree, min, max, avg, curVal, newVal } = this.props
		return (
			<div>
				<div style={styles.header}>
					<div style={styles.title}>
						<img style={styles.logo} src='/category.svg' alt='logo' />
						<p>3rd Year Gradebook</p>
					</div>
					<div style={styles.timerContainer}>
						<p>build</p>
						<div style={styles.timer}>
							<p>{this.props.sTimeBuild}</p>
						</div>
						<p>min</p>
						<div style={styles.timer}>
							<p>s: {this.props.sTimeMin}</p>
							<p>a: {this.props.aTimeMin}</p>
						</div>
						<p>max</p>
						<div style={styles.timer}>
							<p>s: {this.props.sTimeMax}</p>
							<p>a: {this.props.aTimeMax}</p>
						</div>
						<p>sum</p>
						<div style={styles.timer}>
							<p>s: {this.props.sTimeSum}</p>
							<p>a: {this.props.aTimeSum}</p>
						</div>
						<p>update</p>
						<div style={styles.timer}>
							<p>s: {this.props.sTimeUpdate}</p>
							<p>a: {this.props.aTimeUpdate}</p>
						</div>
					</div>

				</div>
				<div style={styles.flexContainer}>
					<div style={styles.filterContainer}>
						<CategorySelector courses={courses} studentList={this.state.studentList} sortList={this.sortList} originalList={studentList} />
					</div>
					<div>
						<ActionContainer studentList={this.state.studentList} updateSegmentTree={updateSegmentTree} opSegmentTree={opSegmentTree} min={min} max={max} avg={avg} curVal={curVal} newVal={newVal} />
						<StudentTable studentList={this.state.studentList} sortList={this.sortList} />
					</div>
				</div>
			</div>
		);
	}
}

const styles = {
	header: {
		padding: 10,
		position: 'relative',
		display: 'flex',
		justifyContent: 'space-between'
	},
	title: {
		display: 'flex',
		alignItems: 'center',
		height: 'fit-content'
	},
	logo: {
		width: 30,
		height: 30,
		marginRight: 15
	},
	timerContainer: {
		position: 'absolute',
		zIndex: 1000,
		right: 15,
		top: 10,
		fontSize: 10
	},
	timer: {
		padding: 10,
		border: '3px solid #000',
		borderRadius: 5,
		backgroundColor: 'gray',
		color: '#fff'
	},
	flexContainer: {
		position: 'relative',
		display: 'flex'
	},
	filterContainer: {
		margin: '40px 50px 0 50px',
	}
}

const mapStateToProps = state => {
	return {
		studentList: state.studentReducer.studentList,
		courses: state.courseReducer.courses,

		min: state.studentReducer.operation.min,
		max: state.studentReducer.operation.max,
		avg: state.studentReducer.operation.avg,
		curVal: state.studentReducer.operation.curVal,
		newVal: state.studentReducer.operation.newVal,

		sTimeBuild: state.studentReducer.sTime.build,
		sTimeMin: state.studentReducer.sTime.min,
		sTimeMax: state.studentReducer.sTime.max,
		sTimeSum: state.studentReducer.sTime.sum,
		sTimeUpdate: state.studentReducer.sTime.update,

		aTimeMin: state.studentReducer.aTime.min,
		aTimeMax: state.studentReducer.aTime.max,
		aTimeSum: state.studentReducer.aTime.sum,
		aTimeUpdate: state.studentReducer.aTime.update,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		buildSegmentTree: (studentList) => {
			dispatch({
				type: 'BUILD_SEGMENT_TREE',
				payload: {
					studentList: [...studentList]
				}
			})
		},
		updateSegmentTree: (idx, oldVal, val, studentList) => {
			dispatch({
				type: 'UPDATE_SCORE',
				payload: {
					idx,
					oldVal,
					val,
					studentList: [...studentList]
				}
			})
		},
		opSegmentTree: (l, r, studentList, type) => {
			const payload = {
				l,
				r,
				studentList: [...studentList]
			}
			switch (type) {
				case 'sum':
					dispatch({
						type: 'CALCULATE_AVERAGE_SCORE',
						payload
					})
					break;
				case 'min':
					dispatch({
						type: 'FIND_MIN',
						payload
					})
					break;
				case 'max':
				default:
					dispatch({
						type: 'FIND_MAX',
						payload
					})
					break;
			}
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GradeBook)