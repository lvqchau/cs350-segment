const querySum = (l, r, array) => {
	// The minimum of reduce is O(n)
	// Array.slice is O(n) with n = end - start
	let sum = array.slice(l, r + 1).reduce((acc, item) => parseFloat(acc + parseFloat(item.score)), 0)
	return sum
}

const queryMin = (l, r, array) => {
	// Find min/max: O(n)
	// Array.slice is O(n) with n = end - start
	let min = 11
	for (let i = l; i <= r; i++) {
		if (array[i] < min)
			min = array[i]
	}
	return min
}

const queryMax = (l, r, array) => {
	// Find min/max: O(n)
	// Array.slice is O(n) with n = end - start
	let max = array[l].score
	for (let i = l + 1; i <= r; i++) {
		if (array[i].score > max)
			max = array[i].score
	}
	return max
}

const update = (idx, val, state) => {
	//O(1)
	state.studentList[idx].score = val
}

export {
	queryMin,
	queryMax,
	querySum,
	update
}