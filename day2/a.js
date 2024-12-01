import { readFileSync } from "fs";

const input = readFileSync("./day2/input.txt", { encoding: "utf8" });
const stringArray = input.split(/\r?\n/);

// A X Rock 1
// B Y Paper 2
// C Z Scissors 3

// Loss 0
// Draw 3
// Win 6

let total = 0;

stringArray.forEach(str => {
	let [a, b] = str.toLowerCase().split(" ");

	if ((a == "a" && b == "x") || (a == "b" && b == "y") || (a == "c" && b == "z")) total += 3;
	else if ((b == "x" && a == "c") || (b == "y" && a == "a") || (b == "z" && a == "b")) total += 6;

	total += b == "x" ? 1 : b == "y" ? 2 : 3;
});

console.log(total);
