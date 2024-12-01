import { readFileSync } from "fs";

// const data = readFileSync("./input/day13.txt", { encoding: "utf8" });
const data = readFileSync("./day13/input.txt", { encoding: "utf8" });
const stringArray = data.split(/\r?\n/);
const packets = [];

for (let i = 0; stringArray.length > i; i += 3) {
	const group = stringArray.slice(i, i + 2);
	packets.push(JSON.parse(group[0]), JSON.parse(group[1]));
}

packets.push([[2]], [[6]]);

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

// console.log(packets);

packets
	.sort((a, b) => {
		console.log(a, b, compare(a, b));
		return compare(a, b) ? -1 : 1;
	})
	.forEach(packet => {
		console.log(JSON.stringify(packet));
	});
