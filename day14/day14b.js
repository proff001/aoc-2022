import { readFileSync } from "fs";

const data = readFileSync("./day14/input.txt", { encoding: "utf8" });
const stringArray = data.split(/\r?\n/);

let highestY = 0;
let highestX = 0;
let lowestX = 0;

const rocks = [];

stringArray.forEach(str => {
	const points = str.split(" -> ");

	points.forEach((point, index) => {
		if (index == points.length - 1) return;

		const start = point.split(",");
		const end = points[index + 1].split(",");
		const [startX, startY] = [parseInt(start[0]), parseInt(start[1])];
		const [endX, endY] = [parseInt(end[0]), parseInt(end[1])];

		if (startY > highestY) highestY = startY;
		if (endY > highestY) highestY = endY;
		if (startX > highestX) highestX = startX;
		if (startX < lowestX) lowestX = startX;
		if (endX > highestX) highestX = startX;
		if (endX < lowestX) lowestX = startX;

		const axis = endX == startX;
		const length = axis ? Math.abs(startY - endY) : Math.abs(startX - endX);
		const negative = axis ? startY > endY : startX > endX;

		for (let i = 0; length + 1 > i; i++) {
			if (axis) {
				const tempI = negative ? startY - i : startY + i;
				if (!rocks[tempI]) rocks[tempI] = [];
				rocks[tempI][startX] = "#";
			} else {
				const tempI = negative ? startX - i : startX + i;
				if (!rocks[startY]) rocks[startY] = [];
				rocks[startY][tempI] = "#";
			}
		}
	});
});

if (!rocks[0]) rocks[0] = [];
rocks[0][500] = "S";

for (let i = 0; highestY + 2 >= i; i++) {
	if (!rocks[i]) rocks[i] = [];
}

for (let i = 0; i < 5000; i++) {
	rocks[highestY + 2][i] = "#";
}

rocks.forEach(row => {
	for (let i = 0; i < 5000; i++) {
		if (!row[i]) row[i] = ".";
	}
});

function moveSand(x, y) {
	if (rocks[y + 1][x] == ".") return moveSand(x, y + 1);
	if (rocks[y + 1][x - 1] == ".") return moveSand(x - 1, y + 1);
	if (rocks[y + 1][x + 1] == ".") return moveSand(x + 1, y + 1);

	if (y == 0 && x == 500) return true;

	rocks[y][x] = "O";
	return false;
}

let sand = 0;
let sandHitTheAbyss = false;

while (!sandHitTheAbyss) {
	if (moveSand(500, 0)) sandHitTheAbyss = true;
	sand++;
}

console.log(sand);
