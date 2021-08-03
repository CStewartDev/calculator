const screen = document.querySelector(".calc-screen");
const numBtns = document.querySelectorAll('.numButton');
const opBtns = document.querySelectorAll('.opButton');
const clearBtn = document.querySelector('.acButton');
const eqBtn = document.querySelector('.eqButton');
const dotBtn = document.querySelector('.dotButton');
const percentBtn = document.querySelector('.percentButton');
const backBtn = document.querySelector('.backButton');


let screenNum = "0";
let storage = "0";
let opStore = null;
let wasCalculated = false;

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
    if(wasCalculated) screenNum = "0"
    let num = e.innerText || e.target.innerText;
    screenNum == "0" ? screenNum = num: screenNum += num;
    updateScreen(screenNum);
    wasCalculated = false;
    }
    

function opBtnPress(e) {
    let tempOp = null;
    let op = e.innerText || e.target.innerText;
    if(opStore !==null) tempOp = op;
    if(opStore !==null && tempOp !==null) eqBtnPress();
    opStore = op || tempOp;
    storage = screenNum;
    updateScreen(screenNum);
    screenNum = "0";
}

function eqBtnPress(){
    let result = 0;
    if(opStore === null) return screenNum;
    storage = Number.parseFloat(storage)
    screenNum = Number.parseFloat(screenNum);
    result = operations[opStore](storage,screenNum);
    screenNum = result;
    storage = "0";
    updateScreen(result);
    opStore = null;
    wasCalculated = true;
}

function clearScreen() {
    screenNum = "0";
    storage = "0";
    opStore = null;
    updateScreen(screenNum);
}

function insertDot(){
    screenNum = screen.textContent.includes('.')? screenNum : screen.textContent + ('.');
    updateScreen(screenNum);
}

function percentage(){
    screenNum = Number(screen.textContent) /100;
    updateScreen(screenNum);
}

function backSpace() {
    screenNum = screen.textContent.slice(0,-1);
    if(screenNum =="") screenNum = "0"
    updateScreen(screenNum)
}

function updateScreen(data){
    screen.textContent = new String(data).substr(0,11);
}

function keyPress(e){
    e.preventDefault();
    const btn = document.querySelector(`div[data-btn="${e.key}"]`);
    if(!btn) return;
    if(btn.classList[0] === "numButton"){
        numBtnPress(btn);
    } else if(btn.classList[0] === "opButton"){
        opBtnPress(btn);
    } else if(btn.classList[0] === "acButton"){
        clearScreen();
    } else if(btn.classList[0] === "percentButton"){
        percentage();
    } else if(btn.classList[0] === "backButton"){
        backSpace();
    } else if(btn.classList[0] === "eqButton"){
        eqBtnPress();
    } else if(btn.classList[0] === "dotButton"){
        insertDot();
    }
}

numBtns.forEach(btn=>btn.addEventListener('click', numBtnPress))
document.addEventListener('keydown', keyPress);
opBtns.forEach(btn=>btn.addEventListener('click',opBtnPress))
clearBtn.addEventListener("click",clearScreen);
eqBtn.addEventListener('click',eqBtnPress)
dotBtn.addEventListener('click',insertDot)
percentBtn.addEventListener('click',percentage)
backBtn.addEventListener('click',backSpace)
