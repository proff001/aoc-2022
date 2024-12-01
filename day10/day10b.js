import { readFileSync } from "fs";

const data = readFileSync("./day10/input.txt", { encoding: "utf8" });
const stringArray = data.split(/\r?\n/);

const crt = Array.from({ length: 6 }, _ => new Array(40));

let sprite = new Array(40).fill(true, 0, 3);
let cycle = 0;
let col = 0;
let row = 0;
let x = 1;

stringArray.forEach(str => {
	const [func, arg] = str.split(" ");

	cycle++;
	drawPixel();

	if (func == "noop") return;

	cycle++;
	drawPixel();
	x += parseInt(arg);

	sprite = new Array(40);
	sprite.fill(true, x - 1, x + 2);
});

function drawPixel() {
	crt[row][col] = sprite[col] ? "#" : ".";
	col++;

	if (cycle % 40 == 0) {
		row++;
		col = 0;
	}
}

crt.forEach(row => {
	console.log(row.join(""));
});
