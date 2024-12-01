import { readFileSync, writeFileSync } from "fs";

const data = readFileSync("./day7/input.txt", { encoding: "utf8" });
const stringArray = data.split(/\r?\n/);

let dirIndex = 0;
function createItem(file, dir, name, size) {
	for (const dirName in dir) {
		if (dirName == currentDir[dirIndex]) {
			if (dirIndex == (currentDir.length > 0 ? currentDir.length - 1 : 0)) {
				if (file) {
					// if (!dir[dirName][name]) dir[dirName][name] = parseInt(size);
					if (!dir[dirName].size) dir[dirName].size = 0;
					dir[dirName].size += parseInt(size);
				} else {
					if (!dir[dirName][name]) dir[dirName][name] = {};
				}

				dirIndex = 0;
				return;
			} else {
				dirIndex++;
				createItem(file, dir[dirName], name, size);
			}
		}
	}
}

const fileTree = {};
const currentDir = [];

stringArray.forEach(str => {
	if (str.includes("$")) {
		const [_prefix, command, arg] = str.split(" ");

		if (command != "cd") return;

		if (arg == "..") currentDir.pop();
		else if (arg == "/") currentDir.splice(0, currentDir.length);
		else currentDir.push(arg);
	} else if (str.includes("dir")) {
		const [_prefix, dirName] = str.split(" ");

		if (currentDir.length < 1) {
			if (!fileTree[dirName]) fileTree[dirName] = {};
		} else createItem(false, fileTree, dirName);
	} else {
		const [fileSize, fileName] = str.split(" ");

		if (currentDir.length < 1) {
			// fileTree[fileName] = parseInt(fileSize);
			if (!fileTree.size) fileTree.size = 0;
			fileTree.size += parseInt(fileSize);
		} else createItem(true, fileTree, fileName, fileSize);
	}
});

let sum = 0;
let getsum = 0;
let getting = false;

const bruh = [];

function sumFolderSize(obj) {
	if (getting) {
		for (const dirName in obj) {
			if (dirName == "size") continue;

			const dir = obj[dirName];
			const keys = Object.keys(dir);

			if (keys.length == 1 && keys.includes("size")) {
				getsum += dir.size;
			} else sumFolderSize(dir);
		}
	} else {
		for (const dirName in obj) {
			if (dirName == "size") continue;

			const dir = obj[dirName];
			const keys = Object.keys(dir);

			// sum += dir.size ?? 0;

			// sumFolderSize(dir);

			// if (keys.length == 1 && dir.size) {
			// 	if (dir.size <= 100000) {
			// 		sum += dir.size;
			// 		console.log(dirName, dir.size);
			// 	}
			// } else {
			// if (dir.size > 100000) sumFolderSize(dir);
			// else {
			let size = dir.size ?? 0;
			// getting = true;

			// sumFolderSize(dir);

			// size += getsum;
			// getsum = 0;
			// getting = false;

			// if (size < 19177471) sumFolderSize(dir);
			// else {
			sum += size;
			bruh.push([dirName, size]);
			// console.log(dirName, size);
			sumFolderSize(dir);
			// }
			// }
			// }
		}
	}
}

sumFolderSize(fileTree["hfm"]["hfm"]["fst"]);

console.log(sum);

// bruh.sort((a, b) => a[1] - b[1]);

console.log(bruh);
// writeFileSync("out3.json", JSON.stringify(bruh, undefined, "\t"), { encoding: "utf8" });
