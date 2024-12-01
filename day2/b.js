import { readFileSync } from "fs";

const input = readFileSync("./day2/input.txt", { encoding: "utf8" });
const stringArray = input.split(/\r?\n/);

// A Rock 1
// B Paper 2
// C Scissors 3

// X Lose 0
// Y Draw 3
// Z Win 6

let total = 0;

stringArray.forEach(str => {
	let [a, b] = str.toLowerCase().split(" ");

	if (b == "x") {
		b = a == "a" ? "c" : a == "b" ? "a" : "b";
	} else if (b == "y") {
		b = a;
		total += 3;
	} else if (b == "z") {
		b = a == "a" ? "b" : a == "b" ? "c" : "a";
		total += 6;
	}

	total += b == "a" ? 1 : b == "b" ? 2 : b == "c" ? 3 : 0;
});

console.log(total);
