import { readFileSync } from "fs";

const data = readFileSync("./day13/input.txt", { encoding: "utf8" });
const stringArray = data.split(/\r?\n/);
const groups = [];

for (let i = 0; stringArray.length > i; i += 3) {
	const group = stringArray.slice(i, i + 2);
	group[0] = JSON.parse(group[0]);
	group[1] = JSON.parse(group[1]);

	groups.push(group);
}

let globalBreak = false;
function compare(left, right) {
	let rightOrder = true;
	if (typeof left != "object") left = [left];
	if (typeof right != "object") right = [right];

	const length = right.length > left.length ? right.length : left.length;

	for (let i = 0; i < length; i++) {
		const leftData = left[i];
		const rightData = right[i];

		if (!rightOrder || (leftData === undefined && rightData === undefined) || globalBreak) {
			break;
		}

		if (leftData === undefined || rightData === undefined) {
			if (rightData === undefined) rightOrder = false;
			globalBreak = true;
			break;
		}

		if (leftData === rightData) continue;

		if (typeof leftData == "object" || typeof rightData == "object") {
			if (!compare(leftData, rightData)) {
				rightOrder = false;
				break;
			}
		} else {
			if (leftData < rightData) {
				globalBreak = true;
				break;
			}

			if (leftData > rightData) {
				rightOrder = false;
				break;
			}
		}
	}

	return rightOrder;
}

let sum = 0;

groups.forEach(([left, right], index) => {
	const inRightOrder = compare(left, right);
	if (inRightOrder) sum += index + 1;
	globalBreak = false;
});

console.log(sum);
