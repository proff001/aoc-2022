import { readFileSync } from "fs";

const data = readFileSync("./day4/input.txt", { encoding: "utf8" });
const stringArray = data.split(/\r?\n/);
const pairs = [];

stringArray.forEach(str => {
	let [elf1, elf2] = str.split(",");
	elf1 = elf1.split("-");
	elf2 = elf2.split("-");

	pairs.push([
		[parseInt(elf1[0]), parseInt(elf1[1])],
		[parseInt(elf2[0]), parseInt(elf2[1])],
	]);
});

let contains = 0;
let overlapping = 0;

pairs.forEach(pair => {
	const [elf1, elf2] = pair;

	if ((elf1[0] <= elf2[0] && elf1[1] >= elf2[1]) || (elf2[0] <= elf1[0] && elf2[1] >= elf1[1])) {
		contains++;
	}

	if (
		elf1[0] == elf2[0] ||
		elf1[0] == elf2[1] ||
		elf1[1] == elf2[0] ||
		elf1[1] == elf2[1] ||
		(elf1[0] > elf2[0] && elf1[0] < elf2[1]) ||
		(elf2[0] > elf1[0] && elf2[0] < elf1[1]) ||
		(elf1[1] < elf2[1] && elf1[1] > elf2[0]) ||
		(elf2[1] < elf1[1] && elf2[1] > elf1[0])
	) {
		overlapping++;
	}
});

console.log("A:", contains);
console.log("B:", overlapping);
