import { readFileSync } from "fs";

// const data = readFileSync("./day15/input.txt", { encoding: "utf8" });
const data = readFileSync("./test.txt", { encoding: "utf8" });
const stringArray = data.split(/\r?\n/).map(str => str.split(": "));

let highestX = 0;
let lowestX = 0;
let highestY = 0;
let lowestY = 0;

const locations = [];

stringArray.forEach(([strSensor, strBeacon]) => {
	strSensor = strSensor.split(" ").splice(2);
	strBeacon = strBeacon.split(" ").splice(4);

	const sensor = [parseInt(strSensor[0].replaceAll(/([^0-9.-])/g, "")), parseInt(strSensor[1].replaceAll(/([^0-9.-])/g, ""))];
	const beacon = [parseInt(strBeacon[0].replaceAll(/([^0-9.-])/g, "")), parseInt(strBeacon[1].replaceAll(/([^0-9.-])/g, ""))];

	if (sensor[1] > highestY) highestY = sensor[1];
	if (beacon[1] < lowestY) lowestY = beacon[1];
	if (sensor[1] > highestY) highestY = sensor[1];
	if (beacon[1] < lowestY) lowestY = beacon[1];
	if (sensor[0] > highestX) highestX = sensor[0];
	if (beacon[0] < lowestX) lowestX = beacon[0];
	if (sensor[0] > highestX) highestX = sensor[0];
	if (beacon[0] < lowestX) lowestX = beacon[0];

	locations[`${sensor[1]},${sensor[0]}`] = "S";
	locations[`${beacon[1]},${beacon[0]}`] = "B";
});

console.log(locations);

// locations.forEach(row => {
// 	console.log(row.join(""));
// });
