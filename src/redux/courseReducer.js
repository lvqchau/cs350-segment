let initialData = {
	courses: [
		'CS422',
		'CS350',
		'CS333',
		'CS311'
	]
}

const courseReducer = (state = initialData, action) => {
	return { ...state }
}

export default courseReducer