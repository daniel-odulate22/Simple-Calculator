import React, { useState } from "react";
import ButtonsContainer from "./components/ButtonsContainer";
import DisplayContainer from "./components/DisplayContainer";
import "./styles.css";

function App() {
  const [display, setDisplay] = useState("");
  const [result, setResult] = useState("");

  function handleClick(e) {
    const targetValue = e.target.name;
    setDisplay(display + targetValue);
  }

  function operatorClick(operator) {
    let lastCharacter = display.slice(-2);
    let operatorsArray = ["+ ", "- ", "* ", "/ "];

    if (display === "" && (operator === "+" || operator === "-" || operator === "*" || operator === "/")) {
      return; 
    }

    if (operatorsArray.includes(lastCharacter)) return;

    setDisplay((prevDisplay) => {
      return prevDisplay + " " + operator + " ";
    });
  }

  function handleEqual() {
    if (display === "" || display.slice(-2).includes("+ ") || display.slice(-2).includes("- ") || display.slice(-2).includes("* ") || display.slice(-2).includes("/ ")) {
        return;
    }

    try {
      // Using a safer way to evaluate the expression
      const resultValue = new Function('return ' + display)();
      setResult(resultValue.toString());
      setDisplay(resultValue.toString()); // Set display to result for next operation
    } catch (error) {
      setDisplay("Error");
      setResult("");
    }
  }

  function handleDecimal(e) {
    console.log('handleDecimal clicked', e && e.target && e.target.name);
    // Prevent multiple decimals in the current number token
    const parts = display.split(" ");
    const last = parts[parts.length - 1];
    // if last is an operator or empty, append '0.' else append '.' if not present
    if (last === undefined || last === "" || ["+", "-", "*", "/"].includes(last)) {
      setDisplay((prev) => prev + "0.");
      return;
    }
    if (String(last).includes(".")) return; // already has decimal
    setDisplay((prev) => prev + ".");
  }

  function handlePercent(e) {
    console.log('handlePercent clicked', e && e.target && e.target.name);
    // Calculator-style percent:
    // - If expression is "A op B" and op is + or -, treat B% as (A * B / 100)
    // - If op is * or /, or no left operand, treat B% as (B / 100)
    if (!display) return;
    const parts = display.split(" ");
    const last = parts[parts.length - 1];
    if (!last || ["+", "-", "*", "/"].includes(last)) return;
    const lastNum = Number(last);
    if (Number.isNaN(lastNum)) return;

    // find operator token before last number (if any)
    const operatorIndex = parts.length - 2;
    const prevIndex = parts.length - 3;
    const operator = operatorIndex >= 0 ? parts[operatorIndex] : null;
    const prevToken = prevIndex >= 0 ? parts[prevIndex] : null;

    let percentValue;
    if ((operator === "+" || operator === "-") && prevToken !== null && prevToken !== undefined && prevToken !== "" && !isNaN(Number(prevToken))) {
      // percent relative to previous operand
      const leftNum = Number(prevToken);
      percentValue = (leftNum * lastNum) / 100;
    } else {
      // simple percent (divide by 100)
      percentValue = lastNum / 100;
    }

    // replace last token with computed percent value
    parts[parts.length - 1] = String(percentValue);
    const newDisplay = parts.join(" ");
    setDisplay(newDisplay);
    setResult(String(percentValue));
  }

  function clear() {
    setDisplay("");
    setResult("");
  }

  function backspace() {
    setDisplay(display.slice(0, -1));
  }

  return (
    <>
      <header>
        <h1 className="page-title">Simple Calculator</h1>
      </header>

      <div className="calculator">
        <DisplayContainer display={display} result={result} />
        <ButtonsContainer
          operatorClick={operatorClick}
          handleClick={handleClick}
          handleEqual={handleEqual}
          clear={clear}
          backspace={backspace}
          handleDecimal={handleDecimal}
          handlePercent={handlePercent}
        />
      </div>

      <footer>
        <p className="copyright">&copy; 2025. All rights reserved. Built by Daniel Odulate.</p>
      </footer>
    </>
  );
}

export default App;