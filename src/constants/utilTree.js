// All O(logn)
const buildTree = (index, start, end, tree, array) => {
	tree[index] = { min: 0, max: 0, sum: 0 }
	if (start === end) {
		tree[index].min = parseFloat(array[start]['score'])
		tree[index].max = parseFloat(array[start]['score'])
		tree[index].sum = parseFloat(array[start]['score'])
	}
	else {
		let mid = parseInt((start + end) / 2)
		buildTree(2 * index, start, mid, tree, array)
		buildTree(2 * index + 1, mid + 1, end, tree, array)
		tree[index].sum = tree[2 * index].sum + tree[2 * index + 1].sum
		tree[index].min = Math.min(tree[2 * index].min, tree[2 * index + 1].min)
		tree[index].max = Math.max(tree[2 * index].max, tree[2 * index + 1].max)
	}
}

const querySumTree = (index, start, end, l, r, tree) => {
	if (r < start || end < l) {
		return 0
	}
	if (l <= start && end <= r) {
		return tree[index].sum
	}
	let mid = parseInt((start + end) / 2)
	let p1 = querySumTree(2 * index, start, mid, l, r, tree)
	let p2 = querySumTree(2 * index + 1, mid + 1, end, l, r, tree)
	return (p1 + p2)
}

const queryMinTree = (index, start, end, l, r, tree) => {
	if (l <= start && r >= end) {
		return tree[index].min
	}	
	if (end < l || start > r) {
		return 1000
	}
	let mid = parseInt(start+(end-start)/2)
	
	let p1 = queryMinTree(2 * index, start, mid, l, r, tree)
	let p2 = queryMinTree(2 * index + 1, mid + 1, end, l, r, tree)
	return Math.min(p1, p2)
}

const queryMaxTree = (index, start, end, l, r, tree) => {
	if (r < start || end < l) {
		return 0
	}
	if (l <= start && end <= r) {
		return tree[index].max
	}
	let mid = parseInt((start + end) / 2)
	let p1 = queryMaxTree(2 * index, start, mid, l, r, tree)
	let p2 = queryMaxTree(2 * index + 1, mid + 1, end, l, r, tree)
	return Math.max(p1, p2)
}

const updateTree = (index, start, end, idx, val, array, state) => {
	let { segmentTree } = state
	let tree = segmentTree
	if (start === end) {
		array[idx]['score'] = val.toFixed(1).toString()
		tree[index].sum = val.toFixed(1)
		tree[index].max = val.toFixed(1)
		tree[index].min = val.toFixed(1)
	} else {
		let mid = parseInt((start + end) / 2)
		if (start <= idx && idx <= mid) {
			updateTree(2 * index, start, mid, idx, val, array, state)
		}
		else {
			updateTree(2 * index + 1, mid + 1, end, idx, val, array, state)
		}
		tree[index].sum = tree[2 * index].sum + tree[2 * index + 1].sum
		tree[index].max = Math.min(tree[2 * index].min, tree[2 * index + 1].min)
		tree[index].min = Math.max(tree[2 * index].max, tree[2 * index + 1].max)
	}
}

export {
	buildTree,
	queryMinTree,
	queryMaxTree,
	querySumTree,
	updateTree
}