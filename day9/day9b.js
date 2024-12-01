import { readFileSync } from "fs";

const data = readFileSync("./day9/input.txt", { encoding: "utf8" });
const stringArray = data.split(/\r?\n/);
const knots = Array.from({ length: 10 }, _ => ({ x: 0, y: 0 }));
const visitedPos = [];

function distanceBetween(pos1, pos2) {
	const x = pos1.x - pos2.x;
	const y = pos1.y - pos2.y;

	return { x, y, absX: Math.abs(x), absY: Math.abs(y) };
}

stringArray.forEach(str => {
	const headPos = knots[0];
	const [dir, amount] = str.split(" ");

	for (let i = 0; i < parseInt(amount); i++) {
		if (dir == "U") headPos.y += 1;
		else if (dir == "D") headPos.y -= 1;
		else if (dir == "L") headPos.x -= 1;
		else if (dir == "R") headPos.x += 1;

		for (let j = 1; j < knots.length; j++) {
			const tailPos = knots[j];
			let dist = distanceBetween(knots[j - 1], tailPos);

			if (dist.absX < 2 && dist.absY < 2) {
				if (j == knots.length - 1 && !visitedPos.includes(`${tailPos.x},${tailPos.y}`)) visitedPos.push(`${tailPos.x},${tailPos.y}`);
				continue;
			}

			while (dist.absX > 1 || dist.absY > 1) {
				if (dist.absX > 0 && dist.absY > 0) {
					tailPos.x += dist.x > 0 ? 1 : -1;
					tailPos.y += dist.y > 0 ? 1 : -1;
				} else if (dist.absX > 1) tailPos.x += dist.x > 0 ? 1 : -1;
				else if (dist.absY > 1) tailPos.y += dist.y > 0 ? 1 : -1;

				dist = distanceBetween(knots[j - 1], tailPos);

				if (j == knots.length - 1 && !visitedPos.includes(`${tailPos.x},${tailPos.y}`)) visitedPos.push(`${tailPos.x},${tailPos.y}`);
			}
		}
	}
});

console.log(visitedPos.length);
