import { buildTree, updateTree, queryMinTree, queryMaxTree, querySumTree } from "../constants/utilTree"
import { querySum, queryMin, queryMax, update } from "../constants/utilArray"

let initialData = {
	studentList: [
		{
			studentId: '1751054',
			fullname: 'Long Vu Quynh Chau',
			courseId: 'CS422',
			score: '4.5'
		},
		{
			studentId: '1751012',
			fullname: 'Nguyen Chan Nam',
			courseId: 'CS350',
			score: '5.5'
		},
		{
			studentId: '1751004',
			fullname: 'Tran Nguyen Hien',
			courseId: 'CS350',
			score: '7.5'
		},
		{
			studentId: '1751028',
			fullname: 'Nguyen Ngoc Minh Huy',
			courseId: 'CS350',
			score: '9.5'
		},
		{
			studentId: '1751054',
			fullname: 'Long Vu Quynh Chau',
			courseId: 'CS422',
			score: '3.5'
		},
		{
			studentId: '1751012',
			fullname: 'Nguyen Chan Nam',
			courseId: 'CS333',
			score: '2.5'
		},
		{
			studentId: '1751004',
			fullname: 'Tran Nguyen Hien',
			courseId: 'CS333',
			score: '8.5'
		},
		{
			studentId: '1751028',
			fullname: 'Nguyen Ngoc Minh Huy',
			courseId: 'CS333',
			score: '9.5'
		},
		{
			studentId: '1751054',
			fullname: 'Long Vu Quynh Chau',
			courseId: 'CS422',
			score: '6.5'
		},
		{
			studentId: '1751012',
			fullname: 'Nguyen Chan Nam',
			courseId: 'CS422',
			score: '10.0'
		},
		{
			studentId: '1751004',
			fullname: 'Tran Nguyen Hien',
			courseId: 'CS422',
			score: '7.0'
		},
		{
			studentId: '1751028',
			fullname: 'Nguyen Ngoc Minh Huy',
			courseId: 'CS311',
			score: '2.0'
		},
		{
			studentId: '1751054',
			fullname: 'Long Vu Quynh Chau',
			courseId: 'CS311',
			score: '7.0'
		},
		{
			studentId: '1751012',
			fullname: 'Nguyen Chan Nam',
			courseId: 'CS311',
			score: '9.0'
		},
		{
			studentId: '1751004',
			fullname: 'Tran Nguyen Hien',
			courseId: 'CS311',
			score: '10.0'
		},
		{
			studentId: '1751028',
			fullname: 'Nguyen Ngoc Minh Huy',
			courseId: 'CS422',
			score: '8.0'
		},
		{
			studentId: '1751054',
			fullname: 'Long Vu Quynh Chau',
			courseId: 'CS422',
			score: '4.5'
		}
	],
	segmentTree: [],
	operation: {
		avg: 0,
		min: 0,
		max: 0,
		curVal: 0,
		newVal: 0
	},
	sTime: {
		build: 0,
		min: 0,
		max: 0,
		sum: 0,
		update: 0,
	},
	aTime: {
		min: 0,
		max: 0,
		sum: 0,
		update: 0,
	}
}

let studentReducer = (state = initialData, action) => {
	switch (action.type) {
		case 'BUILD_SEGMENT_TREE':
			if (action.payload.studentList.length === 0)
				state.segmentTree = []
			else {
				let oldBuildTime = performance.now()
				buildTree(1, 0, action.payload.studentList.length - 1, state.segmentTree, action.payload.studentList)
				let newBuildTime = performance.now()
				state.sTime.build = (newBuildTime - oldBuildTime)
			}
			return { ...state }
		case 'UPDATE_SCORE':
			if (action.payload.studentList.length === 0)
				state.segmentTree = []
			else {
				state.operation.curVal = action.payload.oldVal
				state.operation.newVal = action.payload.val
				let oldUpdateTime = performance.now()
				updateTree(1, 0, action.payload.studentList.length - 1, action.payload.idx, action.payload.val, action.payload.studentList, state)
				let newUpdateTime = performance.now()
				state.sTime.update = (newUpdateTime - oldUpdateTime)

				oldUpdateTime = performance.now()
				update(action.payload.idx, action.payload.val, state)
				newUpdateTime = performance.now()
				state.aTime.update = (newUpdateTime - oldUpdateTime)
			}
			return { ...state }
		case 'FIND_MIN':
			if (action.payload.studentList.length === 0)
				state.segmentTree = []
			else {
				let oldMinTime = performance.now()
				let minTree = queryMinTree(1, 0, action.payload.studentList.length - 1, action.payload.l, action.payload.r, state.segmentTree).toFixed(1)
				let newMinTime = performance.now()
				state.sTime.min = (newMinTime - oldMinTime)
				state.operation.min = minTree

				oldMinTime = performance.now()
				let minArr = queryMin(action.payload.l, action.payload.r, action.payload.studentList)
				newMinTime = performance.now()
				state.aTime.min = (newMinTime - oldMinTime)
			}
			return { ...state }
		case 'FIND_MAX':
			if (action.payload.studentList.length === 0)
				state.segmentTree = []
			else {
				let oldMaxTime = performance.now()
				let maxTree = queryMaxTree(1, 0, action.payload.studentList.length - 1, action.payload.l, action.payload.r, state.segmentTree).toFixed(1)
				let newMaxTime = performance.now()
				state.sTime.max = (newMaxTime - oldMaxTime)
				state.operation.max = maxTree

				oldMaxTime = performance.now()
				let maxArr = queryMax(action.payload.l, action.payload.r, action.payload.studentList)
				newMaxTime = performance.now()
				state.aTime.max = (newMaxTime - oldMaxTime)
			}
			return { ...state }
		case 'CALCULATE_AVERAGE_SCORE':
			let { l, r, studentList } = action.payload
			if (studentList.length === 0)
				state.segmentTree = []
			else {
				let oldSumTime = performance.now()
				let sum = querySumTree(1, 0, studentList.length - 1, l, r, state.segmentTree)
				let newSumTime = performance.now()
				state.sTime.sum = (newSumTime - oldSumTime)
				state.operation.avg = (sum / (r - l + 1)).toFixed(1)

				oldSumTime = performance.now()
				let arrSum = querySum(l, r, studentList)
				newSumTime = performance.now()
				state.aTime.sum = (newSumTime - oldSumTime)
			}
			return { ...state }
		default:
			return { ...state }
	}
}

export default studentReducer