import { readFileSync } from "fs";

const data = readFileSync("./day8/input.txt", { encoding: "utf8" });
const grid = data.split(/\r?\n/).map(row => [...row]);

let highestScore = 0;

grid.forEach((row, rowIndex) => {
	row.forEach((col, colIndex) => {
		if (rowIndex == 0 || rowIndex == grid.length - 1 || colIndex == 0 || colIndex == row.length - 1) return;

		const collum = grid.map(row => row[colIndex]);
		const height = parseInt(col);
		const view = {};

		const leftTrees = row.slice(0, colIndex).reverse();
		for (let i = 0; i < leftTrees.length; i++) {
			if (leftTrees[i] >= height || i == leftTrees.length - 1) {
				view.left = i + 1;
				break;
			}
		}

		const rightTrees = row.slice(colIndex + 1);
		for (let i = 0; i < rightTrees.length; i++) {
			if (rightTrees[i] >= height || i == rightTrees.length - 1) {
				view.right = i + 1;
				break;
			}
		}

		const topTrees = collum.slice(0, rowIndex).reverse();
		for (let i = 0; i < topTrees.length; i++) {
			if (topTrees[i] >= height || i == topTrees.length - 1) {
				view.top = i + 1;
				break;
			}
		}

		const bottomTrees = collum.slice(rowIndex + 1);
		for (let i = 0; i < bottomTrees.length; i++) {
			if (bottomTrees[i] >= height || i == bottomTrees.length - 1) {
				view.bottom = i + 1;
				break;
			}
		}

		const score = view.top * view.left * view.right * view.bottom;
		if (score > highestScore) highestScore = score;
	});
});

console.log(highestScore);
