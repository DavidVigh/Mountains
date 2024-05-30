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
    value: element,
  };

  document.querySelector("#climateselect").addOption(newOption);
}
