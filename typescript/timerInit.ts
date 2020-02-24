import Timer from "./components/timer.js";


/**
 *
 * @param el A Query selector for the element to contain the timer , this can be any valid css selector
 * @param id The first number has specfic properties , it can be a one for session storage or two for local storage
 * @param storage this is a refrence to the storage type of your choice or false if none
 * @param buttons this is an array of THREE buttons in Stop Pause Start order;
 */
export default function timerInit (el:string , id:string , storage:any , buttons:[HTMLButtonElement,HTMLButtonElement,HTMLButtonElement]){
    const readout = document.querySelector(el) as HTMLElement;
    const recordedTime = storage!==false && storage.getItem('session') ? Number(storage.getItem('session'+id)) : 0 as number;
    const timer = new Timer(readout,recordedTime,id);
    timer.assignButtons(buttons)

}