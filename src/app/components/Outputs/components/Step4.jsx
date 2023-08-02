import { useEffect, useState } from "react";
import { copyMatrix, markZeroToRed, resetMarkMatrix } from "../../../utils/matrix"
import Table from "../../Table/Table";

const subMinMatrix = (inMatrix, min) => {
  const matrix = copyMatrix(inMatrix);
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      const cell = matrix[y][x];
      if (cell.doubleMark) {
        matrix[y][x] = { ...cell, value: cell.value + min };
      } else if (!cell.simpleMark) {
        matrix[y][x] = { ...cell, value: cell.value - min };
      }
    }
  }

  return markZeroToRed(resetMarkMatrix(matrix));
}

const Step4 = ({ sourceMatrix = [], labelX, labelY, min = 0, hidden = false, onResult = () => { } }) => {
  const [matrix, setMatrix] = useState([])

  useEffect(() => {
    if(sourceMatrix && min) {
      const _matrix = subMinMatrix(sourceMatrix, min);
      setMatrix(_matrix);
      onResult(_matrix);
    }
  }, [sourceMatrix, min]); // eslint-disable-line

  return (
    <div style={{ marginTop: 16 }}>
      <h2 style={{ visibility: hidden ? 'hidden' : 'visible' }}>4ème Etape</h2>
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
export default Step4