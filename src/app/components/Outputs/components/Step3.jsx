import { useState, useEffect } from "react"
import { copyMatrix, getColMatrix, getRowMatrix, resetMarkMatrix } from "../../../utils/matrix"
import Table from "../../Table/Table"

const getNonZeroMarkedLine = (matrix, markedX) => {
  for (let y = 0; y < matrix.length; y++) {
    const nonMarkedCell = matrix[y].filter(x => x.marked).length < 1;
    const markedLine = markedX.length > 0 && (getColMatrix(markedX, y).filter(v => v.value === '+').length > 0);
    if(!markedLine && nonMarkedCell) return y;
  }
  return -1;
}

const markLine = (marked, index) => {
  for (let y = 0; y < marked.length; y++) {
    if(marked[y][index].value !== '+') {
      marked[y][index] = { value: '+' };
      return;
    }
  }
}

const markMatrix = (sourceMatrix) => {
  const matrix = copyMatrix(sourceMatrix);
  let markedX = [];
  let markedY = [];
  let y = 0;
  y = getNonZeroMarkedLine(matrix, markedX);
  while (y > -1) {
    markedX.push([...Array(matrix.length).fill({ value: '' })]);
    markedY.push([...Array(matrix.length).fill({ value: '' })]);
    markLine(markedX, y);

    let stop = false;
    let row = getRowMatrix(matrix, y);
    while (!stop) {
      let crossedRow = row
        .map((v, i) => { return { index: i, crossed: v.crossed } })
        .filter(v => v.crossed)
        .map(v => v.index);
      if (crossedRow.length < 1) stop = true;
      else {
        for (let x of crossedRow) {
          markLine(markedY, x);
          const col = getColMatrix(matrix, x);
          const markedCol = col
            .map((v, i) => { return { index: i, marked: v.marked } })
            .filter(v => v.marked)
            .map(v => v.index);
          if (markedCol.length < 1) stop = true;
          else {
            for (let _y of markedCol) {
              markLine(markedX, _y);
              row = getRowMatrix(matrix, _y);
            }
          }
        }
      }
    }
    y = getNonZeroMarkedLine(matrix, markedX);
  }

  return [markedX, markedY];
}

const markColRowMatrix = (sourceMatrix, markedX, markedY) => {
  const matrix = resetMarkMatrix(sourceMatrix);
  let min = 1000;
  let minIndex = { x: 0, y: 0 };
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      if(markedX[0][y].value === '') {
        if(markedY[0][x].value === '+') {
          matrix[y][x] = {...matrix[y][x], doubleMark: true, style: { backgroundColor: 'pink' } }
        } else {
          matrix[y][x] = {...matrix[y][x], simpleMark: true, style: { backgroundColor: 'yellow'} }
        }
      } else {
        if(markedY[0][x].value === '+') {
          matrix[y][x] = {...matrix[y][x], simpleMark: true, style: { backgroundColor: 'yellow'} }
        } else {
          if(matrix[y][x].value < min) {
            min = matrix[y][x].value;
            minIndex = { x, y }
          }
        }
      }
    }
  }
  let _x = minIndex.x;
  let _y = minIndex.y;
  matrix[_y][_x] = { ...matrix[_y][_x], minMark: true, style: { backgroundColor: 'red', color: 'white' } }
  return [matrix, matrix[_y][_x].value];
}

const Step3 = ({ sourceMatrix = [], labelX, labelY, hidden = false, onResult = () => { } }) => {
  const [matrix, setMatrix] = useState([])
  const [markedX, setMarkedX] = useState([])
  const [markedY, setMarkedY] = useState([])

  useEffect(() => {
    const [_markedX, _markedY] = markMatrix(sourceMatrix);
    setMarkedX(_markedX);
    setMarkedY(_markedY);
    const [_matrix, min] = markColRowMatrix(sourceMatrix, _markedX, _markedY);
    setMatrix(_matrix)
    onResult(_matrix, min);
  }, [sourceMatrix]) // eslint-disable-line

  return (
    <div style={{ marginTop: 16 }}>
      <h2 style={{ visibility: hidden ? 'hidden' : 'visible' }}>3ème Etape</h2>
      <Table
        matrix={matrix}
        labelX={labelX}
        labelY={labelY}
        markedX={markedX}
        markedY={markedY}
        hidden={hidden}
        readOnly
      />
    </div>
  )
}

export default Step3
