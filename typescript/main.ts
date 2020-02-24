import timerInit from "./timerInit.js";

const buttons_dom = document.querySelectorAll('.btn') as NodeListOf<Element>;
const buttons = [...buttons_dom] as [HTMLButtonElement,HTMLButtonElement,HTMLButtonElement];

function modeToggle (el:HTMLElement) {
    let _el = document.body;
    let toggle = false;
    return ()=>{
        _el.classList.toggle('light',toggle);
        _el.classList.toggle('dark',!toggle);
        el.innerText = toggle ? 'light mode' : 'darkMode';
        toggle = !toggle;
    }
}


let toggleSwitch = document.querySelector('#viewing-mode') as  HTMLElement;
toggleSwitch.addEventListener('click',modeToggle(toggleSwitch));


timerInit('.timer-readout','0365',false,buttons);
timerInit('.session-readout','1432',localStorage,buttons);
timerInit('.project-readout','2348',localStorage,buttons);


