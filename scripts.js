const screen = document.querySelector(".calc-screen");
const numBtns = document.querySelectorAll('.numButton');
const opBtns = document.querySelectorAll('.opButton')
const clearBtn = document.querySelector('.acButton');
const eqBtn = document.querySelector('.eqButton')


let screenNum = "0";
let storage = "0";
let opStore = null;
let usePrevNum = false;

const operations = {
    "+": (...args) => args.reduce((total,curr)=> total + curr),
    "-": (...args) =>args.reduce((total,curr)=> total - curr),
    "*": (...args) => [...args].reduce((total,curr)=> total * curr,1),
    "/": (...args) => {
                    if(args[0]===0 || args[1]===0) return "nope";
                    return [...args].reduce((total,curr)=> total / curr)
                },
}

function numBtnPress(e) {
    let num = e.target.innerText;
    num !== "0"? usePrevNum = false:usePrevNum = true;
    if(usePrevNum) num = "0";
    
    screenNum == "0" ? screenNum = num: screenNum += num;
    debugger;
    updateScreen(screenNum);
    }
    

function opBtnPress(e) {
    usePrevNum = true;
    let op = e.target.innerText;
    if(opStore !==null) return opStore = op;
    opStore = op;
    storage = screenNum;
    updateScreen(screenNum)
    //screenNum = "0";
}

function eqBtnPress(){
    let result = 0;
    if(opStore === null) return screenNum;
    storage = Number.parseFloat(storage)
    screenNum = Number.parseFloat(screenNum);
    result = operations[opStore](storage,screenNum);
    screenNum = result;
    storage = "0";
    updateScreen(result)
    opStore = null;
}

function clearScreen() {
    screenNum = "0";
    storage = "0";
    opStore = null;
    updateScreen(screenNum)
}

function updateScreen(data){
    screen.textContent = data
}

numBtns.forEach(btn=>btn.addEventListener('click', numBtnPress))
opBtns.forEach(btn=>btn.addEventListener('click',opBtnPress))
clearBtn.addEventListener("click",clearScreen);
eqBtn.addEventListener('click',eqBtnPress)