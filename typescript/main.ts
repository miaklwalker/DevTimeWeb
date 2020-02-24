import Timer from "./components/timer.js";





const buttons_dom = document.querySelectorAll('.btn') as NodeListOf<Element>;
const buttons = [...buttons_dom] as [HTMLButtonElement,HTMLButtonElement,HTMLButtonElement];
//ID
// first number was 1 for local 2 for session 0 for none
// next three are id
function timerInit (el:string , id:string , storage:any , buttons:[HTMLButtonElement,HTMLButtonElement,HTMLButtonElement]){
    const readout = document.querySelector(el) as HTMLElement;
    const recordedTime = storage!==false && storage.getItem('session') ? Number(storage.getItem('session'+id)) : 0 as number;
    const timer = new Timer(readout,recordedTime,id);
    timer.assignButtons(buttons)

}

timerInit('.timer-readout','0365',false,buttons);
timerInit('.session-readout','1432',localStorage,buttons);
timerInit('.project-readout','2348',localStorage,buttons);


