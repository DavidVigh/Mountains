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
  });

const submit = document.getElementById("addmountain");

submit.addEventListener("click", () => {
  const tags = document.getElementById("climatetags");

  tags.value = selectedClimates;
});


function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })
}


async function addMountain(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  let data = {
    name: formData.get("m-name"),
    game: formData.get("game"),
    details: formData.get("details"),
    imgPath: await fileToBase64(formData.get("image")),
    height: formData.get("height"),
    climate: formData.get("climatetags").split(',')
  }

  console.log(data)


  const init = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }

  fetch(`http://localhost:3000/mountains`, init)
}

document.getElementById("addmountain").addEventListener("submit", addMountain);
