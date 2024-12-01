import { readFileSync } from "fs";

const data = readFileSync("./day1/input.txt", { encoding: "utf8" });
const stringArray = data.split(/\r?\n/);
const elfs = [];
let elfIndex = 0;

stringArray.forEach(str => {
	if (str == "") {
		elfIndex++;
		return;
	}

	if (!elfs[elfIndex]) elfs[elfIndex] = 0;

	elfs[elfIndex] += parseInt(str);
});

elfs.sort();

console.log(elfs[elfs.length - 1] + elfs[elfs.length - 2] + elfs[elfs.length - 3]);
