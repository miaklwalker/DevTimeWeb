const timer = `
    <section class="timer bg-secondary">
        <h1 class="danger">TIMER</h1>
        <h1 class="timer-readout">00:00:00:00</h1>
        <div class="btn-group">
        <button class=" bg-danger white btn">Stop</button>
        <button class="bg-black primary btn">Pause</button>
        <button class="bg-primary white btn">Start</button>
        </div>
    </section>
`;

function saveToCache(sec:number,id:string){
let storage = id[0] === '1' ? sessionStorage : id[0]==='2' ? localStorage : false;
    if(storage) {
        if (storage.getItem('session' + id) !== null) {
            let current = Number(sessionStorage.getItem('session' + id));
            current += sec;
            storage.setItem('session' + id, String(current));
            } else {
                storage.setItem('session' + id, String(sec));
        }
    }
}

export default class Timer {
    secondsWorked:number;
    private timer:number;
    el:HTMLElement;
    id: string;
    constructor(el:HTMLElement,starting:number = 0,id:string){
        this.secondsWorked = starting;
        this.timer = 0;
        this.el = el;
        this.id = id;
    }
    start=()=>{
        this.timer = window.setInterval(()=> {
            this.secondsWorked++;
            this.showTimer();
            this.secondsWorked % 60 && saveToCache(this.secondsWorked,this.id);
        },1000) as number;
    };
    pause=()=>{
        window.clearInterval(this.timer);
        saveToCache(this.secondsWorked,this.id);
    };
    stop=()=>{
        let time = this.secondsWorked;
        window.clearInterval(this.timer);
        this.secondsWorked = 0;
        this.showTimer();
        saveToCache(time,this.id);
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
    assignButtons(buttons:[HTMLButtonElement,HTMLButtonElement,HTMLButtonElement]){
        const [stop , pause , start] = buttons;
        stop.addEventListener('click',this.stop);
        pause.addEventListener('click',this.pause);
        start.addEventListener('click',this.start);
    }
    makeTimer(el:HTMLElement){
        el.innerHTML = timer;
    }
}