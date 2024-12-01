import { readFileSync } from "fs";
import _ from "lodash";

const prio = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const data = readFileSync("./day3/input.txt", { encoding: "utf8" });
const stringArray = data.split(/\r?\n/);
const groups = [];

for (let i = 0; stringArray.length > i; i += 3) {
	groups.push(stringArray.slice(i, i + 3));
}

let sum = 0;

groups.forEach(group => {
	let letters = {};

	[...group[0]].forEach(letter => {
		if (group[1].includes(letter) && group[2].includes(letter)) {
			if (!letters[letter]) letters[letter] = 0;
			letters[letter]++;
		}
	});

	[...group[1]].forEach(letter => {
		if (group[0].includes(letter) && group[2].includes(letter)) {
			if (!letters[letter]) letters[letter] = 0;
			letters[letter]++;
		}
	});

	[...group[2]].forEach(letter => {
		if (group[0].includes(letter) && group[1].includes(letter)) {
			if (!letters[letter]) letters[letter] = 0;
			letters[letter]++;
		}
	});

	let highest = { key: "", value: 0 };

	_.forEach(letters, (value, key) => {
		if (value > highest.value) {
			highest = { key, value };
		}
	});

	sum += prio.indexOf(highest.key) + 1;
});

console.log(sum);
