const display = document.querySelector(".content");
const buttons = document.querySelectorAll(".keypad .btn, .btnD, .btnR, .btnE");

let input = "";

function updateDisplay(value) {
  display.value = value || "0";
}

function evaluateExpression(expression) {
  try {
    let result = new Function(
      `return ${expression.replace(/×/g, "*").replace(/÷/g, "/")}`
    )();
    return Number.isFinite(result) && !Number.isInteger(result)
      ? result.toFixed(3)
      : result.toString();
  }
  catch {
    return "ERROR";
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "=") {
      input = evaluateExpression(input);
    }
    else if (value === "Del") {
      input = input.slice(0, -1);
    }
    else if (value === "Reset") {
      input = "";
    }
    else {
      input += value;
    }

    updateDisplay(input);
  });
});

updateDisplay(input);
