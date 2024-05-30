import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import tinycolor from "tinycolor2";

//Made by Vigh David

import { Mountain } from "./src/js/Mountain";
import { Page } from "./src/js/Page";

import { climateColors } from "./src/js/data";


// DATA

let mountains = [];
let pages = [];

async function getMountains() {
  const response = await fetch(`http://localhost:3000/mountains`);
  const data = await response.json();
  data.map((d) =>
    mountains.push(
      new Mountain(
        d["id"],
        d["name"],
        d["game"],
        d["details"],
        d["imgPath"],
        d["height"],
        d["climate"]
      )
    )
  );
}

await getMountains();

async function getPages() {
  const response = await fetch(`http://localhost:3000/pages`);
  const data = await response.json();
  data.map((p) =>
    pages.push(new Page(p["id"], p["title"], p["description"], p["sections"]))
  );
}

await getPages();

console.log(pages);
console.log(mountains);

function getCurrentPageData() {
  let params = new URL(document.location).searchParams;
  const id = params.get("mountain-id");
  const currentPage = {
    ...mountains[id - 1],
    ...pages[id - 1]
  };
  return currentPage;
}

function setPageData() {
    const currentPage = getCurrentPageData();

    const pageTitle = document.getElementById("pageTitle");
    pageTitle.textContent = currentPage.title;

    console.log(currentPage);

    // IMG AND UTILS

    // Image
    const body = document.querySelector('body');
    const img = document.getElementById('content-desc');
    const path = currentPage.imgPath.replaceAll('\\', '/');

    body.style.backgroundImage = `url(${path})`;
    body.style.backgroundAttachment = "fixed";
    body.style.backgroundRepeat = "norepeat";
    body.style.backgroundSize = "cover";
    body.style.backdropFilter = "blur(10px)";
    
    img.style.backgroundImage = `linear-gradient(0deg, rgba(23, 28, 33, 0.80), rgba(43, 48, 53, 0.80)), url(${path})`;
    img.classList.add("bg");

    // Name
    const name = document.getElementById('name-of-mountain');
    name.textContent = currentPage.name;
    // ...

    // Game
    const game = document.getElementById('name-of-game');
    game.textContent = currentPage.game;
    // ...

    // Badges
    const tags = document.getElementById('climate-tags');
    
    for (const iterator of currentPage.climate) {
        const span = document.createElement('span');
        span.classList.add("badge");
        span.style.background = climateColors[iterator];
        span.style.boxShadow = "2px 2px 0px #696969";
        span.classList.add("text-dark");
        span.classList.add("p-2");
        span.classList.add("m-1");
        span.textContent = iterator;
        tags.appendChild(span);
    }
    // ...

    /* COLOR ADJUSTING
    const colors = [];

    for (const iterator of currentPage.climate) {
        const color = tinycolor(climateColors[iterator]);
        colors.push(color.darken(45).setAlpha(0.5));
    }
*/


    // TEXT BACKGROUND

    const contentBox = document.querySelector('.content-box');
    contentBox.style.background = tinycolor("white").setAlpha(0.7);
    // contentBox.style.background = `linear-gradient(${colors.join(", ")})`;

    // const box = document.querySelector('.box');
    // box.style.background = "white";


    // TEXT CONTENT
    const content1 = document.querySelector('#content-col-1');
    const content2 = document.querySelector('#content-col-2');

    let count = 1;
    for (const iterator of currentPage.sections) {
        const title = document.createElement('h4');
        title.textContent = iterator.title;
        title.style.fontWeight = "600";
        const text = document.createElement('p');
        text.textContent = iterator.content;

        if (title.textContent == "Conclusion") {
            const conclusion = document.querySelector('#content-col-conclusion');
            conclusion.appendChild(title);
            conclusion.appendChild(text);
        }
        else{
            if (count % 2 == 1){
                content1.appendChild(title);
                content1.appendChild(text);
            }
            else{
                content2.appendChild(title);
                content2.appendChild(text);
            }
            count++;
        }
    }
}

setPageData();