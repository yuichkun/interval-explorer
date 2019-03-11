// Hyper Parameter
inlets = 1;
outlets = 1;
// Internal State
let k = 1;
let n = 1;

function set_k(_k) {
	k = _k;
}

function set_negatify(_n) {
	n = _n;	
}

function stackIntervals(arr) {
	const ret = [];
	for (let i = 0; i < arr.length; i+=1){
		if (i === 0) {
			ret.push(arr[0]);
			continue;
		}	
		let acc = 0;
		let _i = 0;
		while (_i <= i) {
			acc += arr[_i];
			_i += 1;
		}
		ret.push(acc);
	}
	return ret;
}

function list(...args) {
	if (n === 1) {
		args = args.concat(args.map(n => n * -1));
	}
	// args = args.concat(args.map(n => n + 12));
	const sorted = args.sort((a, b) => a - b);
	post(sorted);
	const result = explore(sorted, k);
	result.forEach(r => {
		outlet(0, r);
	});
}

function k_combinations(set, k) {
	var i, j, combs, head, tailcombs;
	
	// There is no way to take e.g. sets of 5 elements from
	// a set of 4.
	if (k > set.length || k <= 0) {
		return [];
	}
	
	// K-sized set has only one K-sized subset.
	if (k == set.length) {
		return [set];
	}
	
	// There is N 1-sized subsets in a N-sized set.
	if (k == 1) {
		combs = [];
		for (i = 0; i < set.length; i++) {
			combs.push([set[i]]);
		}
		return combs;
	}
	combs = [];
	for (i = 0; i < set.length - k + 1; i++) {
		// head is a list that includes only our current element.
		head = set.slice(i, i + 1);
		// We take smaller combinations from the subsequent elements
		tailcombs = k_combinations(set.slice(i + 1), k - 1);
		// For each (k-1)-combination we join it with the current
		// and store it to the set of k-combinations.
		for (j = 0; j < tailcombs.length; j++) {
			combs.push(head.concat(tailcombs[j]));
		}
	}
	return combs;
}

function explore(arr, _k) {
	_k = Math.min(arr.length, _k);
	const cb = k_combinations(arr, _k);
	// console.log(cb);
	const stacked = cb.map(stackIntervals);
	// console.log(stacked);
	// const merged = [].concat(...stacked);
	// console.log(merged);
	return stacked;	
}

// const hoge =explore([2, 4, 5, 7], 3);
// console.log('hoge',hoge);