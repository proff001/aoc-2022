import { readFileSync } from "fs";

const data = readFileSync("./day9/input.txt", { encoding: "utf8" });
const stringArray = data.split(/\r?\n/);

const headPos = { x: 0, y: 0 };
const tailPos = { x: 0, y: 0 };
const visitedPos = [];

function distanceBetween(pos1, pos2) {
	const x = pos1.x - pos2.x;
	const y = pos1.y - pos2.y;

	return { x, y, absX: Math.abs(x), absY: Math.abs(y) };
}

stringArray.forEach(str => {
	const [dir, amount] = str.split(" ");

	if (dir == "U") headPos.y += parseInt(amount);
	else if (dir == "D") headPos.y -= parseInt(amount);
	else if (dir == "L") headPos.x -= parseInt(amount);
	else if (dir == "R") headPos.x += parseInt(amount);

	let dist = distanceBetween(headPos, tailPos);

	if (!visitedPos.includes(`${tailPos.x},${tailPos.y}`)) visitedPos.push(`${tailPos.x},${tailPos.y}`);

	if (dist.absX < 2 && dist.absY < 2) return;

	while (dist.absX > 1 || dist.absY > 1) {
		if (dist.absX > 0 && dist.absY > 0) {
			tailPos.x += dist.x > 0 ? 1 : -1;
			tailPos.y += dist.y > 0 ? 1 : -1;
		} else if (dist.absX > 1) tailPos.x += dist.x > 0 ? 1 : -1;
		else if (dist.absY > 1) tailPos.y += dist.y > 0 ? 1 : -1;

		dist = distanceBetween(headPos, tailPos);

		if (!visitedPos.includes(`${tailPos.x},${tailPos.y}`)) visitedPos.push(`${tailPos.x},${tailPos.y}`);
	}
});

console.log(visitedPos.length);
