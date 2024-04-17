import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"
import { Mountain } from "./src/js/Mountain";

let mountains = [];

async function getMountains() {
    const response = await fetch(`http://localhost:3000/mountains`);
    const data = await response.json();
    data.map(d => mountains.push(new Mountain(
        d["id"],
        d["name"],
        d["game"],
        d["details"],
        d["imgPath"],
        d["height"]
    )))
}

await getMountains();

const main = document.querySelector("main");

const mountainOne = mountains[0];

const img = document.createElement("img");

img.src = mountainOne.imgPath;

main.appendChild(img);

console.log(mountains)

