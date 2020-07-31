import React, { Component } from 'react'
import StudentItem from './StudentItem'
import TableHeader from '../../components.js/TableHeader'

class StudentTable extends Component {

	render() {
		let { studentList, sortList } = this.props
		return (
			<div style={styles.tableContainer}>
				<table style={{ borderSpacing: '0 15px' }}>
					<thead style={styles.thead}>
						<tr>
							<th width='10%' align='left' style={styles.th}>
								Id
							</th>
							<TableHeader studentList={studentList} sortList={sortList} width='20%' title='StudentId' type='studentId' />
							<TableHeader studentList={studentList} sortList={sortList} width='35%' title='Fullname' type='fullname' />
							<TableHeader studentList={studentList} sortList={sortList} width='20%' title='CourseID' type='courseId' />
							<TableHeader studentList={studentList} sortList={sortList} width='15%' title='Score' type='score' />
						</tr>
					</thead>
					<tbody style={styles.tbody}>
						{
							studentList.map((student, index) => {
								return (
									<StudentItem key={index} id={index + 1} student={student} />
								)
							})
						}
					</tbody>
				</table>
			</div>
		);
	}
}

const styles = {

	tableContainer: {
		width: 830
	},
	table: {
		width: 830,
		padding: 5,
		display: 'block'
	},
	tbody: {
		maxHeight: 300,
		overflow: 'scroll',
		display: 'block'
	},
	thead: {
		display: 'table',
		width: '100%',
		tableLayout: 'fixed'
	},
	th: {
		padding: 0,
		paddingLeft: 25
	}
}

export default StudentTable;