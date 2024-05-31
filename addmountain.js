import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "/src/js/virtual-select.min.js";

import { climateColors } from "/src/js/data";

//Made by Vigh David

import { Mountain } from "/src/js/Mountain";

VirtualSelect.init({
  ele: "#climateselect",
  placeholder: "Select climate(s)",
});

for (const key in climateColors) {
  const element = climateColors[key];

  const newOption = {
    label: key,
    value: key,
  };

  document.querySelector("#climateselect").addOption(newOption);
}

let selectedClimates = [];

document
  .querySelector("#climateselect")
  .addEventListener("change", function () {
    let selectedClimate = document.querySelector(".vscomp-hidden-input").value;

    selectedClimates = selectedClimate.split(",");

    console.log(selectedClimates);
  });

const submit = document.getElementById("addmountain");

submit.addEventListener("click", () => {
  const tags = document.getElementById("climatetags");

  tags.value = selectedClimates;

  console.log(tags);
});

let params = new URL(document.location).searchParams;
let tags = params.get("climatetags");
let name = params.get("name");
let image = params.get("image");
let height = params.get("height");
let game = params.get("game");
let details = params.get("details");

console.log(tags);

console.log(details);
