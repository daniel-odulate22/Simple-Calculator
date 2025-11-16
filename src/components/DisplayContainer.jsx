import React from "react";

function DisplayContainer({ display, result }) {
  return (
    <>
      <div className="display-container">
        {/* The top field shows the full expression or previous result */}
        <div className="input-field">{display || "0"}</div>
        {/* The bottom field shows the current result or number being typed */}
        <div className="answer-field">{result || (display === "" ? "0" : "")}</div>
      </div>
    </>
  );
}

export default DisplayContainer;