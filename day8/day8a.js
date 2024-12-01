import { readFileSync } from "fs";

const data = readFileSync("./day8/input.txt", { encoding: "utf8" });
const grid = data.split(/\r?\n/).map(row => [...row]);

let visibleCount = 0;

grid.forEach((row, rowIndex) => {
	row.forEach((col, colIndex) => {
		if (rowIndex == 0 || rowIndex == grid.length - 1 || colIndex == 0 || colIndex == row.length - 1) {
			visibleCount++;
		} else {
			const collum = grid.map(row => row[colIndex]);
			const height = parseInt(col);
			let visible = { top: true, right: true, left: true, bottom: true };
			let direction = "left";

			for (let i = 0; i < row.length; i++) {
				if (i == colIndex) {
					direction = "right";
					continue;
				}

				if (parseInt(row[i]) >= height) {
					visible[direction] = false;
				}
			}

			direction = "top";

			for (let i = 0; i < collum.length; i++) {
				if (i == rowIndex) {
					direction = "bottom";
					continue;
				}

				if (parseInt(collum[i]) >= height) {
					visible[direction] = false;
				}
			}

			if (visible.top || visible.right || visible.left || visible.bottom) visibleCount++;
		}
	});
});

console.log(visibleCount);
