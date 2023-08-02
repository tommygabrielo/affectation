import { useEffect, useState } from "react";
import { copyMatrix, getColMatrix, getRowMatrix } from "../../../utils/matrix";
import Table from "../../Table/Table";

const getMinZeroRows = (inputMatrix = []) => {
  let matrix = copyMatrix(inputMatrix);
  let min = 1000;
  let minRow = -1;
  let numberOfZeroUnfish = 10;

  while (numberOfZeroUnfish > 0) {
    numberOfZeroUnfish = 0;
    for (let y = 0; y < matrix.length; y++) {
      const countZero = matrix[y]
        .filter(x => +x.value === 0)
        .filter(x => !(x.marked || x.crossed)).length;
      numberOfZeroUnfish += countZero;
      if (countZero > 0 && countZero < min) {
        min = countZero;
        minRow = y;
      }
    }

    if (minRow > -1) {
      const y = minRow;
      const x = matrix[y]
        .map(x => (+x.value > 0 || x.crossed || x.marked) ? 1 : 0).indexOf(0);
      matrix = markZeroCell(matrix, x, y);
    }
    min = 1000;
    minRow = -1;
  }
  return matrix;
}

const markZeroCell = (inputMatrix = [], x, y) => {
  const matrix = copyMatrix(inputMatrix);
  matrix[y][x] = { ...matrix[y][x], marked: true, style: { color: 'white' } }
  const row = getRowMatrix(matrix, y);
  const col = getColMatrix(matrix, x);
  row.forEach((cell, _x) => {
    if (x !== _x) {
      if (+cell.value === 0) matrix[y][_x] = { ...matrix[y][_x], crossed: true };
    }
  });

  col.forEach((cell, _y) => {
    if (y !== _y) {
      if (+cell.value === 0) matrix[_y][x] = { ...matrix[_y][x], crossed: true };
    }
  })
  return matrix;
}

const Step2 = ({ sourceMatrix = [], labelX, labelY, hidden = false, onResult = () => { } }) => {
  const [matrix, setMatrix] = useState(copyMatrix(sourceMatrix));

  useEffect(() => {
    let _matrix = getMinZeroRows(sourceMatrix);
    setMatrix(_matrix)
    onResult(_matrix);
  }, [sourceMatrix]) // eslint-disable-line

  return (
    <div style={{ marginTop: 16 }}>
      <h2 style={{ visibility: hidden ? 'hidden' : 'visible' }}>2ème Etape</h2>
      <Table
        matrix={matrix}
        labelX={labelX}
        labelY={labelY}
        hidden={hidden}
        readOnly
      />
    </div>
  )
}

export default Step2
