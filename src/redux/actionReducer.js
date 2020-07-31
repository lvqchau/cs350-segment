let initialData = {
	type: '',
	result: ''
}

const actionReducer = (state = initialData, action) => {
	return { ...state }
}

export default actionReducer