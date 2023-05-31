const add = ((a,b)=> Number(a)+Number(b));
const subtract = ((a,b)=> Number(a)-Number(b));
const multiply = ((a,b)=>a*b);
const divide = ((a,b)=>a/b);
const plusMinus = (a=>(-1)*a);
const percent = (a =1,b)=> (a*(b/100));
let displayText= "";
let runningTotal = 0;
let pressedSideKey = false;
const allButtons = document.querySelectorAll("button");
const nonOperator = ["AC","+/-","%","=","."];
const display = document.querySelector(".display>div")
const roundResult = function (result){
    return(Math.round(result*100)/100)
}

const wrapper = document.querySelector(".container");

wrapper.addEventListener('click', (event) => {
  const isButton = event.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  }
const pressedKey = event.target.textContent


if (pressedKey == "AC"){resetAC()}
if (pressedKey == "+/-") {
    if(displayText!= "") {
        pmOperand = plusMinus(displayText);
        displayText= roundResult(pmOperand);
    } else {  
        pmOperand =plusMinus(runningTotal);
        runningTotal = roundResult(pmOperand)}
        display.textContent = roundResult(pmOperand)
    }
if(event.target.classList.contains("top")){
    popEffect(event.target,"topPop");
}
if(!event.target.classList.contains("top") && pressedSideKey || pressedKey == "AC" && pressedSideKey){
    document.querySelector(".sideEffect").classList.toggle("sideEffect");
    pressedSideKey = false;
}
if(event.target.classList.contains("side") && pressedKey != "="){
    event.target.classList.toggle("sideEffect");
    pressedSideKey = true;
 }


if (pressedKey == "%") {
    if(displayText!= "") {
    percentOperand = percent(currentNum, displayText);
    displayText= roundResult(percentOperand);
    } else {  
    percentOperand =percent(1, runningTotal);
    runningTotal = roundResult(percentOperand)}
    display.textContent = roundResult(percentOperand)
    }    

if(pressedKey == "="){
    popEffect(event.target,"topPop")
    operate(currentNum,displayText,operator);
  operator = undefined;}
if(isNaN(pressedKey) &&
   !nonOperator.includes(pressedKey)){             //console.log("isNaN Not nonOperator");
   if(operator !== undefined){console.log("operator !== undefined");
    result = operate(currentNum,displayText,operator);
    displayText = "";
    currentNum = displayText
    operator = (pressedKey);
    popEffect(display,"timeOut")
    operator = (pressedKey);

   } else {                         //console.log("else of operator !== undefined");
    previousNum = currentNum;
    currentNum = displayText;
    displayText= "";
    popEffect(display,"timeOut")
    operator = (pressedKey);
    }

}
if(!isNaN(pressedKey)|| pressedKey == "."){                     // console.log("!isNAN");
    popEffect(event.target,"mainButtonPop");
    displayText = displayText + event.target.textContent
    document.querySelector(".display>div").textContent = displayText;
}
console.log("currentNum: " + currentNum + "\n previousNum: "+ previousNum + "\n operator: "+operator + "\n runningTotal: "+runningTotal + "\n displayText: "+displayText);
});

function popEffect (item,classAdd) { 
    item.classList.toggle(classAdd);
    setTimeout(function() {
    item.classList.toggle(classAdd);
    },80)};



let currentNum;
let previousNum;
let operator;

function operate(num1,num2,operator){
    let result;
    if(operator == "+") result = add(num1,num2);
    if(operator == "-") result = subtract(num1,num2);
    if(operator == "x") result = multiply(num1,num2);
    if(operator == "÷") result = divide(num1,num2);
    console.log(result);
    runningTotal = roundResult(runningTotal + result);
    displayText = "";
    currentNum=undefined;
    document.querySelector(".display>div").textContent = runningTotal;
    operator = undefined;
    return(displayText);

}

function resetAC () {
    currentNum=undefined;
    previousNum=undefined;
    operator=undefined;
    displayText="";
    runningTotal=0;
    const resetText = 0;
    document.querySelector(".display>div").textContent = resetText ;
    console.log("Reset");
}


