
import modeToggle from "./components/nightModeToggle.js";

let toggleSwitch = document.querySelector('#viewing-mode') as  HTMLElement;
toggleSwitch.addEventListener('click',modeToggle(toggleSwitch));





