import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

import { Mountain } from "./src/js/Mountain";
import { Page } from "./src/js/Page";

let mountains = [];
let pages = [];

async function getData() {
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

await getData();

async function getPages() {
  const response = await fetch(`http://localhost:3000/pages`);
  const data = await response.json();
  data.map((p) =>
    pages.push(new Page(p["id"], p["title"], p["description"], p["sections"]))
  );
}

await getPages();

function getCurrentPage(id) {
  let selectedPage;

  for (const page of pages) {
    if (page.id == id) {
      selectedPage = page;
      return selectedPage;
    }
    selectedPage = new Object();
  }
  return selectedPage;
}

function deleteData(id) {
    const init = {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json"
      },
    };

    console.log(`http://localhost:3000/mountains?id=${id}`);
  
    fetch(`http://localhost:3000/mountains/${id}`, init);
    
    fetch(`http://localhost:3000/pages/${id}`, init);

  }
  

function showData() {
  const table = document.querySelector("tbody");
  const template = document.querySelector("template");
  for (const mountain of mountains) {
    const clone = template.content.cloneNode(true);

    const currentPage = getCurrentPage(mountain.id);

    clone.querySelectorAll("td")[0].textContent = mountain.id;
    clone.querySelectorAll("td")[1].textContent = mountain.name;

    clone.querySelectorAll("td")[2].textContent =
      Object.keys(currentPage).length != 0 ? currentPage.title : "null";

    clone.querySelector(".btn-danger").addEventListener("click", () => {
      deleteData(mountain.id);
    });

    table.appendChild(clone);
  }
}

showData();

