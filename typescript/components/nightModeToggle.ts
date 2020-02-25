export default function modeToggle (el:HTMLElement) {
    let _el = document.body;
    let toggle = false;
    return ()=>{
        _el.classList.toggle('light',toggle);
        _el.classList.toggle('dark',!toggle);
        el.innerText = toggle ? 'light mode' : 'darkMode';
        toggle = !toggle;
    }
}