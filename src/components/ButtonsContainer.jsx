import React from "react";
import Button from "./Button";

function ButtonsContainer({ handleClick, operatorClick, handleEqual, clear, backspace, handleDecimal, handlePercent }) {
  return (
    <div className="keypad-container">
      <div className="keypad-grid">
        {/* Row 1 */}
        <Button className="btn-function" handleClick={clear} name={"AC"} value={"AC"} />
        <Button className="btn-function" handleClick={backspace} name={"DEL"} value={"DEL"} />
        <Button className="btn-function" handleClick={handlePercent} name={"%"} value={"%"} />
        <Button className="btn-operator" handleClick={() => operatorClick("/")} name={"/"} value={"/"} />
        
        {/* Row 2 */}
        <Button className="btn-number" handleClick={handleClick} name={7} value={7} />
        <Button className="btn-number" handleClick={handleClick} name={8} value={8} />
        <Button className="btn-number" handleClick={handleClick} name={9} value={9} />
        <Button className="btn-operator" handleClick={() => operatorClick("*")} name={"*"} value={"x"} />
        
        {/* Row 3 */}
        <Button className="btn-number" handleClick={handleClick} name={4} value={4} />
        <Button className="btn-number" handleClick={handleClick} name={5} value={5} />
        <Button className="btn-number" handleClick={handleClick} name={6} value={6} />
        <Button className="btn-operator" handleClick={() => operatorClick("-")} name={"-"} value={"-"} />
        
        {/* Row 4 */}
        <Button className="btn-number" handleClick={handleClick} name={1} value={1} />
        <Button className="btn-number" handleClick={handleClick} name={2} value={2} />
        <Button className="btn-number" handleClick={handleClick} name={3} value={3} />
        <Button className="btn-operator" handleClick={() => operatorClick("+")} name={"+"} value={"+"} />
        
        {/* Row 5 */}
        <Button className="btn-number btn-zero" handleClick={handleClick} name={0} value={0} />
        <Button className="btn-function" handleClick={handleDecimal} name={"."} value={"."} />
        <Button className="btn-equals" handleClick={handleEqual} name={"="} value={"="} />
      </div>
    </div>
  );
}

export default ButtonsContainer;