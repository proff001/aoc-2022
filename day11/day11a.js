import { readFileSync } from "fs";

const data = readFileSync("./day11/input.txt", { encoding: "utf8" });
const stringArray = data.split("\r\n\r\n");

const activity = Array.from({ length: 8 }, _ => 0);
const monkeys = [];

stringArray.forEach(str => {
	const monkeyData = str.split("\r\n");
	monkeyData.shift();

	const monkey = {
		items: [],
		to: [],
	};

	monkeyData.forEach(line => {
		if (line.includes("Starting items")) {
			line.split(": ")[1]
				.split(", ")
				.forEach(v => monkey.items.push(parseInt(v)));
		} else if (line.includes("Operation")) {
			monkey.operation = line.split(": ")[1].split(" = ")[1];
		} else if (line.includes("Test")) {
			monkey.test = parseInt(line.replace(/\D+/g, ""));
		} else if (line.includes("true")) {
			monkey.to[0] = parseInt(line.replace(/\D+/g, ""));
		} else if (line.includes("false")) {
			monkey.to[1] = parseInt(line.replace(/\D+/g, ""));
		}
	});

	monkeys.push(monkey);
});

for (let i = 0; i < 20; i++) {
	monkeys.forEach((monkey, index) => {
		monkey.items.forEach(item => {
			const worry = Math.floor(eval(monkey.operation.replaceAll("old", item)) / 3);
			monkeys[worry % monkey.test == 0 ? monkey.to[0] : monkey.to[1]].items.push(worry);
			activity[index]++;
		});

		monkey.items = [];
	});
}

activity.sort((a, b) => b - a);

console.log(activity[0] * activity[1]);
