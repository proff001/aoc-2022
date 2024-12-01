import { readFileSync } from "fs";

const data = readFileSync("./day5/input.txt", { encoding: "utf8" });
const stringArray = data.split(/\r?\n/);
const stackArray = stringArray.splice(0, 8).reverse();
stringArray.splice(0, 2);

const stacksA = [];
const stacksB = [];

stackArray.forEach(str => {
	[...str].forEach((letter, index) => {
		if (letter == " " || letter == "[" || letter == "]") return;

		const stackIndex = (index - 1) / 4;

		if (!stacksA[stackIndex]) stacksA[stackIndex] = [];
		if (!stacksB[stackIndex]) stacksB[stackIndex] = [];

		stacksA[stackIndex].push(letter);
		stacksB[stackIndex].push(letter);
	});
});

stringArray.forEach(str => {
	if (!/\D+/.test(str)) return;

	const args = str.split(/\D+/);
	const [amount, from, to] = [parseInt(args[1]), parseInt(args[2]) - 1, parseInt(args[3]) - 1];
	let moved = 0;

	while (moved < amount) {
		const moving = stacksA[from].splice(stacksA[from].length - 1);
		stacksA[to].push(...moving);
		moved++;
	}
});

console.log("A:", stacksA.map(stack => stack[stack.length - 1]).join(""));

stringArray.forEach(str => {
	if (!/\D+/.test(str)) return;

	const args = str.split(/\D+/);
	const [amount, from, to] = [parseInt(args[1]), parseInt(args[2]) - 1, parseInt(args[3]) - 1];
	const moving = stacksB[from].splice(stacksB[from].length - amount);

	stacksB[to].push(...moving);
});

console.log("B:", stacksB.map(stack => stack[stack.length - 1]).join(""));
