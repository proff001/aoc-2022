import { readFileSync } from "fs";

const data = readFileSync("./day/input.txt", { encoding: "utf8" });
// const data = readFileSync("./test.txt", { encoding: "utf8" });
const stringArray = data.split(/\r?\n/);
