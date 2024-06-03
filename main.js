import "/src/css/bootstrap-tagsinput.css";
import "/src/js/bootstrap-tagsinput.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

import { climateColors } from "./src/js/data";

//Made by Vigh David

import { Mountain } from "./src/js/Mountain";

// DATA

let mountains = [];
let totalMountains;

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
  totalMountains = mountains.length;
}

await getMountains();

function showMountains() {
  const cards = document.getElementById("cards");

  const template = document.getElementById("cardTemplate");

  for (const mountain of mountains) {
    const content = template.content.cloneNode(true);

    // let mountainID = content.getElementById("moreInformaionBtn");
    // mountainID.href = `aboutm.html?mountain-id=${mountain.id}`;

    let img = content.querySelector("img");
    img.src = mountain.imgPath;
    img.alt = mountain.name;

    let title = content.querySelector("h3");
    title.textContent = mountain.name;

    let game = content.getElementById("game");
    game.textContent = mountain.game;

    let details = content.getElementById("details");
    details.textContent = mountain.details;

    let height = content.getElementById("height");
    height.textContent = `${mountain.height} m`;

    let climates = content.getElementById("climate");
    for (const element of mountain.climate) {
      let badge = document.createElement("span");
      badge.classList.add("badge");
      badge.style.background = climateColors[element];
      badge.style.boxShadow = "2px 2px 0px #696969";
      badge.classList.add("text-dark");
      badge.classList.add("p-2");
      badge.classList.add("m-1");
      badge.textContent = element;
      climates.appendChild(badge);
    }

    let card = content.querySelector('.card');
    card.addEventListener("mouseover", () => {
        let cBody = card.querySelector(".card-body");
        cBody.classList.remove("light");
        cBody.classList.add("dark");
    })

    card.addEventListener("mouseout", () => {
        let cBody = card.querySelector(".card-body");
        cBody.classList.remove("dark");
        cBody.classList.add("light");
    })

    card.addEventListener("click", () => {
        document.location.href = `aboutm.html?mountain-id=${mountain.id}`;
    });
    cards.appendChild(content);
  };
}

// FILTERS

let params = new URL(document.location).searchParams;
let tags =
  params.get("tags") != "" && params.get("tags") != null
    ? Array.from(params.get("tags").split(","))
    : null;
let nameInput =
  params.get("nameInput") != "" && params.get("nameInput") != null
    ? params.get("nameInput").toLowerCase()
    : null;
let sMin = params.get("summitMin") != "" ? params.get("summitMin") : null;
let sMax = params.get("summitMax") != "" ? params.get("summitMax") : null;

if (nameInput != null) {
  mountains = mountains.filter((x) => x.name.toLowerCase().includes(nameInput));
}

if (sMin != null && sMax != null) {
  mountains = mountains.filter((x) => x.height >= sMin && x.height <= sMax);
}

if (tags != null) {
  for (const tag of tags) {
    //console.log(tag)
    mountains = mountains.filter((x) =>
      x.climate.some((element) => element === tag)
    );
  }
}

// SUBMIT BTN - (((((((((:

const submit = document.getElementById("submit");

function valuesToArray(obj) {
  const valuesArray = [];
  for (const key in obj) {
    if (key == "tagsInput") {
      const inputForTags = document.querySelectorAll(
        ".bootstrap-tagsinput>span"
      );
      for (const iterator of inputForTags) {
        valuesArray.push(iterator.textContent);
      }
    } else {
      valuesArray.push(obj[key].value);
    }
  }
  return valuesArray;
}

function getTags() {
  let tags = document.querySelectorAll(".bootstrap-tagsinput>span");
  console.log(tags);
  return tags;
}

function getInputValues(obj) {
  return valuesToArray(obj).slice(0, 3);
}

function getTagsValues(obj) {
  return valuesToArray(obj).slice(3, 6);
}

const SubmitAttr = function (obj) {
  for (const key in obj) {
    const input = obj[key];
    if (key == "tagsInput") {
      const lastInputTag = document.querySelector(".bootstrap-tagsinput>input");
      lastInputTag.addEventListener("focusout", () => {
        const inputForTags = getTags();

        if (inputForTags.length !== 0) {
          submit.removeAttribute("disabled");
        }

        inputForTags.forEach((x) =>
          x
            .querySelector('span[data-role="remove"]')
            .addEventListener("click", () => {
              const inputvals = getInputValues(obj);
              if (
                inputForTags.length === 1 &&
                inputvals.every((x) => x == "")
              ) {
                submit.setAttribute("disabled", "disabled");
                console.log(inputvals);
              } else {
                submit.removeAttribute("disabled");
              }
            })
        );
      });
    }

    input.addEventListener("input", () => {
      const values = valuesToArray(obj);
      if (values.some((x) => x !== "")) {
        submit.removeAttribute("disabled");
      } else {
        submit.setAttribute("disabled", "disabled");
      }
    });
  }
};

const filters = {
  nameInput: document.getElementById("nameInput"),
  minHInput: document.getElementById("summitMin"),
  maxHInput: document.getElementById("summitMax"),
  tagsInput: document.getElementById("tags"),
};

SubmitAttr(filters);

// CLEAR BTN - :)))))))))))))))))

const clear = document.getElementById("clear");
function clearForm() {
  clear.addEventListener("click", () => {
    $("#tags").tagsinput("removeAll");
    submit.setAttribute("disabled", "disabled");
  });
}

clearForm();

// MISC

const box = document.getElementById("mountainCount");
const h2 = document.createElement("h2");
h2.textContent = `Mountains (${mountains.length}/${totalMountains})`;
h2.classList.add("text-center");
h2.classList.add("fs-1");
h2.classList.add("fw-bolder");
h2.classList.add("mt-5");
box.appendChild(h2);

console.log(mountains);

showMountains();
