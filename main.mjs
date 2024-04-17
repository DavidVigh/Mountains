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

function showMountains(){
    const cards = document.getElementById("cards");

    const template = document.getElementById("cardTemplate");

    for (const mountain of mountains) {
        const content = template.content.cloneNode(true);

        let img = content.querySelector("img");
        img.src = mountain.imgPath;
        img.alt = mountain.name;

        let title = content.querySelector("h5");
        title.textContent = mountain.name;

        let game = content.getElementById("game");
        game.textContent = `Game: ${mountain.game}`;

        let details = content.getElementById("details");
        details.textContent = mountain.details;

        cards.appendChild(content);
    }
}

/* const main = document.querySelector("main");

const mountainOne = mountains[0];

const img = document.createElement("img");

img.src = mountainOne.imgPath;

main.appendChild(img); */

console.log(mountains)

window.onload = showMountains;

