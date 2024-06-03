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

document
  .querySelector("#climateselect")
  .addEventListener("change", function () {
    let selectedClimate = document.querySelector(".vscomp-hidden-input").value;

    selectedClimates = selectedClimate.split(",");
  });

const submitPage = document.getElementById("addpage");

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
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
    climate: formData.get("climatetags").split(","),
  };

  const init = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(`http://localhost:3000/mountains`, init);
}

document.getElementById("addmountain").addEventListener("submit", addMountain);


async function addPage(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  let data = {
    title: formData.get("title"),
    description: formData.get("description")
  };

  const init = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(`http://localhost:3000/pages`, init);
}


document.getElementById("addpage").addEventListener("submit", addPage);






const sections = document.getElementById("sections");

const sectionTemplate = document.getElementById("sectionManage");

const sectionBody = document.getElementById("select-sections");

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

sections.addEventListener("change", () => {
  removeAllChildNodes(sectionBody);

  for (let index = 0; index < sections.value; index++) {
    const content = sectionTemplate.content.cloneNode(true);

    const titleLabel = content.querySelector("#label-title");

    const titleContent = content.querySelector("#label-content");

    if (index + 1 != sections.value) {
      titleLabel.textContent = `Title ${index + 1}`;

      titleContent.textContent = `Content ${index + 1}`;
    } else {
      titleLabel.textContent = `Conclusion`;

      titleContent.textContent = `Content`;
    }

    sectionBody.appendChild(content);

    console.log(titleLabel);
    console.log(titleContent);
  }
});

const addm = document.getElementById("addm");
const addMountainForm = document.getElementById("addmountain");

const addp = document.getElementById("addp");
const addPageForm = document.getElementById("addpage");

addm.addEventListener("click", () => {
  addm.setAttribute("selected", "selected");
  addMountainForm.classList.remove("d-none");

  addPageForm.classList.add("d-none");
  addp.removeAttribute("selected");
});

addp.addEventListener("click", () => {
  addp.setAttribute("selected", "selected");
  addPageForm.classList.remove("d-none");

  addMountainForm.classList.add("d-none");
  addm.removeAttribute("selected");
});
