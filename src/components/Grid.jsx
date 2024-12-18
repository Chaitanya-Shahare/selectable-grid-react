import React, { useEffect, useState } from "react";

export default function Grid() {
  const [matrix, setMatrix] = useState([]);
  const [startPosition, setStartPosition] = useState([]);
  const [endPosition, setEndPosition] = useState([]);

  const prepareMatrix = () => {
    //     [
    //       {
    //         position: [row, col],
    //         isColored: false,
    //       },
    //     ];

    let arr = [];

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let cell = {
          position: [i, j],
          isColored: false,
        };
        arr.push(cell);
      }
    }

    setMatrix(arr);
  };

  const handleOnDrag = (event, position) => {
    console.log("start position", position);
    setStartPosition(position);
  };

  const handleOnDragOver = (event, position) => {
    console.log("end position", position);
    setEndPosition(position);
  };

  const colorSelected = () => {
    if (startPosition.length === 0 || endPosition.length === 0) return;

    let newMatrix = matrix.map((cell) => {
      if (
        (cell.position[0] >= startPosition[0] &&
          cell.position[1] >= startPosition[1] &&
          cell.position[0] <= endPosition[0] &&
          cell.position[1] <= endPosition[1]) ||
        (cell.position[0] <= startPosition[0] &&
          cell.position[1] <= startPosition[1] &&
          cell.position[0] >= endPosition[0] &&
          cell.position[1] >= endPosition[1])
      ) {
        return {
          ...cell,
          isColored: true,
        };
      }
      return {
        ...cell,
        isColored: false,
      };
    });

    setMatrix(newMatrix);
  };

  useEffect(() => {
    colorSelected();
  }, [startPosition, endPosition]);

  useEffect(() => {
    prepareMatrix();
  }, []);

  return (
    <div className="grid-wrapper">
      <div className="grid">
        {matrix.map((cell, index) => {
          return (
            <div
              key={index}
              draggable
              onDrag={(e) => handleOnDrag(e, cell.position)}
              onDragOver={(e) => handleOnDragOver(e, cell.position)}
              className={`grid__cell grid__cell--${
                cell.isColored ? "colored" : ""
              }`}
            >
              {/* {cell.position} */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
