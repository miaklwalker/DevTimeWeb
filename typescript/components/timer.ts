
// can also be timer-vertical
const timer = `
        <div class="container timer bg-black">
        <h1 class="danger">TIMER</h1>
        <h1 class="timer-readout danger">00:00:00:00</h1>
        <div class="btn-group">
        <button class=" bg-danger white btn">Stop</button>
        <button class="bg-secondary white btn">Pause</button>
        <button class="bg-primary white btn">Start</button>
        </div>
        </div>
`;
const buttons_dom = document.querySelectorAll('.btn') as NodeListOf<Element>;
const defaultButtons = [...buttons_dom] as [HTMLButtonElement,HTMLButtonElement,HTMLButtonElement];

export default class Timer {
    secondsWorked:number;
    private timer:number;
    el:HTMLElement;
    id: string;
    startBuffer: number;
    constructor(el:HTMLElement,starting:number = 0,id:string){
        this.startBuffer = starting;
        this.secondsWorked = starting;
        this.timer = 0;
        this.el = el;
        this.id = id;
    }
    start=()=>{
        this.timer = window.setInterval(()=> {
            this.secondsWorked++;
            this.showTimer();
        },1000) as number;
    };
    pause=()=>{
        window.clearInterval(this.timer);
    };
    stop=()=>{
        let time = this.secondsWorked;
        window.clearInterval(this.timer);
        this.secondsWorked = this.startBuffer;
        this.showTimer();
        return time;
    };
    showTimer(){
        let sec = this.secondsWorked;
        let seconds =    String(sec%60).padStart(2,'0');
        let minutes =   String(Math.floor(sec/60%60)).padStart(2,'0');
        let hours =     String(Math.floor(sec/60/60%24)).padStart(2,'0');
        let days =     String(Math.floor(sec/60/60/24)).padStart(2,'0');
        this.el.innerHTML = `${days}:${hours}:${minutes}:<span class="small-seconds">${seconds}<span>`
        return sec;
    }
    assignButtons(buttons:[HTMLButtonElement,HTMLButtonElement,HTMLButtonElement]=defaultButtons){
        const [stop , pause , start] = buttons;
        stop.addEventListener('click',this.stop);
        pause.addEventListener('click',this.pause);
        start.addEventListener('click',this.start);
    }
    makeTimer(el:HTMLElement){
        el.innerHTML = timer;
    }
}