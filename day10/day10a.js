import { readFileSync } from "fs";

const data = readFileSync("./day10/input.txt", { encoding: "utf8" });
const stringArray = data.split(/\r?\n/);

let cycle = 0;
let sum = 0;
let x = 1;

stringArray.forEach(str => {
	const [func, arg] = str.split(" ");

	cycle++;
	LogValue();

	if (func == "noop") return;

	cycle++;
	LogValue();
	x += parseInt(arg);
});

function LogValue() {
	if (cycle != 20 && (cycle - 20) % 40 != 0) return;
	sum += cycle * x;
}

console.log(sum);
