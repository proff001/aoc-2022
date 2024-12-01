import { readFileSync } from "fs";

const data = readFileSync("./day12/input.txt", { encoding: "utf8" });
const stringArray = data.split(/\r?\n/);

const col = stringArray[0].length;
const row = stringArray.length;

const grid = Array.from({ length: row }, _ => []);

const closed = [];
const open = [];

const path = [];
let start;
let end;

class GridPoint {
	g = 0;
	h = 0;
	neighbors = [];
	parent = undefined;

	get f() {
		return this.g + this.h;
	}

	constructor(x, y, height) {
		this.x = x;
		this.y = y;
		this.height = height;
	}
}

const dist = (p1, p2) => Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);

stringArray.forEach((str, row) => {
	[...str].forEach((letter, col) => {
		if (letter == "S") start = [row, col];
		if (letter == "E") end = [row, col];

		grid[row][col] = new GridPoint(col, row, letter == "S" ? 0 : letter == "E" ? 25 : letter.charCodeAt(0) - 97);
	});
});

end = grid[end[0]][end[1]];
open.push(grid[start[0]][start[1]]);

grid.forEach(rows => {
	rows.forEach(point => {
		if (point.x < col - 1) point.neighbors.push(grid[point.y][point.x + 1]);
		if (point.x > 0) point.neighbors.push(grid[point.y][point.x - 1]);
		if (point.y < row - 1) point.neighbors.push(grid[point.y + 1][point.x]);
		if (point.y > 0) point.neighbors.push(grid[point.y - 1][point.x]);
	});
});

while (open.length > 0) {
	let lowest = 0;

	open.forEach((point, index) => {
		if (point.f < open[lowest].f) lowest = index;
	});

	let current = open[lowest];

	if (current == end) {
		let temp = current;
		path.push(temp);

		while (temp.parent) {
			path.push(temp.parent);
			temp = temp.parent;
		}

		break;
	}

	open.splice(lowest, 1);
	closed.push(current);

	current.neighbors.forEach(neighbor => {
		if (closed.includes(neighbor) || neighbor.height > current.height + 1) return;

		const possibleG = current.g + 1;

		if (!open.includes(neighbor)) open.push(neighbor);
		else return;

		neighbor.g = possibleG;
		neighbor.h = dist(neighbor, end);
		neighbor.parent = current;
	});
}

const map = Array.from({ length: row }, _ => Array.from({ length: col }, _ => "."));

path.reverse().forEach((node, index) => {
	if (index != path.length - 1) {
		const next = path[index + 1];
		if (next.y > node.y) map[node.y][node.x] = "v";
		if (next.y < node.y) map[node.y][node.x] = "^";
		if (next.x > node.x) map[node.y][node.x] = ">";
		if (next.x < node.x) map[node.y][node.x] = "<";
	}
});

map.forEach(row => {
	console.log(row.join(""));
});

console.log("Moves:", path.length - 1);
