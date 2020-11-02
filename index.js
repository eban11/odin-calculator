const clearBtn = document.querySelector(".clear");
const backspaceBtn = document.querySelector(".backspace");
const powerBtn = document.querySelector(".power");
const percentBtn = document.querySelector(".percent");
const divideBtn = document.querySelector(".divide");
const multiplyBtn = document.querySelector(".multiply");
const minusBtn = document.querySelector(".sub");
const addBtn = document.querySelector(".add");
const equalBtn = document.querySelector(".equal");
const valueBtns = document.querySelectorAll(".value");
const inputBox = document.querySelector(".display");

let computedValue = 0;
let typedVal = "";
let isFloating = false;
let lastOpration = "";

const setDisplay = (val) => {
  inputBox.value = val || 0;
};

const handleTyping = function (e) {
  if (!(e.target.dataset.value === "0" && !typedVal.length)) {
    if (e.target.dataset.value === ".") {
      if (isFloating) return;
      if (!typedVal.length) typedVal += "0";
      isFloating = true;
    }
    typedVal += e.target.dataset.value;
    setDisplay(typedVal);
  } else {
    setDisplay(0);
  }
};

const backspace = () => {
  if (typedVal.length) {
    typedVal = typedVal.slice(0, typedVal.length - 1);
    setDisplay(typedVal);
  }
};

const compute = () => {
  if (lastOpration === "%") {
    computedValue /= 100;
  }
  if (!computedValue) {
    computedValue = Number(typedVal);
  } else if (typedVal) {
    const val = Number(typedVal);
    switch (lastOpration) {
      case "+":
        computedValue += val;
        break;
      case "*":
        computedValue *= val;
        break;
      case "^":
        computedValue = Math.pow(computedValue, val);
        break;
      case "/":
        computedValue /= val;
        break;
      case "-":
        computedValue -= val;
        break;
    }
  }
  typedVal = "";
  setDisplay(computedValue);
};

const clear = () => {
  computedValue = 0;
  typedVal = "";
  lastOpration = "";
  isFloating = false;
  setDisplay(0);
};

const add = () => {
  compute();
  lastOpration = "+";
};

const minus = () => {
  if (!typedVal.length) {
    typedVal += "-";
    setDisplay(typedVal);
    return;
  }
  compute();
  lastOpration = "-";
};

const multiply = () => {
  compute();
  lastOpration = "*";
};

const divide = () => {
  compute();
  lastOpration = "/";
};

const power = () => {
  compute();
  lastOpration = "^";
};

const percent = () => {
  compute();
  setDisplay(computedValue / 100);
  lastOpration = "%";
};

const equal = () => {
  compute();
  computedValue = 0;
  lastOpration = "";
  isFloating = false;
};

valueBtns.forEach((btn) => btn.addEventListener("click", handleTyping));

backspaceBtn.addEventListener("click", backspace);
clearBtn.addEventListener("click", clear);
equalBtn.addEventListener("click", equal);

addBtn.addEventListener("click", add);
minusBtn.addEventListener("click", minus);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);
powerBtn.addEventListener("click", power);
percentBtn.addEventListener("click", percent);
