import { readFileSync } from "fs";

const data = readFileSync("./day6/input.txt", { encoding: "utf8" });
const stringArray = [...data];

let foundPacket = false;
stringArray.forEach((_letter, index) => {
	if (foundPacket) return;

	const string = stringArray.slice(0 + index, index + 4);
	const letters = [];

	string.forEach(letter => {
		if (letters.includes(letter)) return;
		letters.push(letter);
	});

	if (letters.length < 4) return;

	console.log("A:", letters.join(""), index + 4);
	foundPacket = true;
});

let foundMessage = false;
stringArray.forEach((_letter, index) => {
	if (foundMessage) return;

	const string = stringArray.slice(0 + index, index + 14);
	const letters = [];

	string.forEach(letter => {
		if (letters.includes(letter)) return;
		letters.push(letter);
	});

	if (letters.length < 14) return;

	console.log("B:", letters.join(""), index + 14);
	foundMessage = true;
});
