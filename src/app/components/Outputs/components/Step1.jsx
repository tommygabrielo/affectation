import { useCallback, useEffect, useState } from "react";
import { copyMatrix, createMatrix, getColMatrix, getRowMatrix, getTotalMatrix, markZeroToRed } from "../../../utils/matrix";
import Table from "../../Table/Table"

const Step1 = ({ sourceMatrix = [], labelX, labelY, onResult = () => {} }) => {
  const [loading, setLoading] = useState(true);
  const [matrix, setMatrix] = useState(copyMatrix(sourceMatrix));
  const [matrix2, setMatrix2] = useState([]);
  const [matrix3, setMatrix3] = useState([]);
  const [markedX, setMarkedX] = useState([]);
  const [markedY, setMarkedY] = useState([]);

  useEffect(() => {
    setLoading(true);
    setMatrix(copyMatrix(sourceMatrix));

    const minMatrixY = getMinMatrixY();
    setMarkedY(minMatrixY);
    setMatrix2(subMatrixY(minMatrixY));
  }, [sourceMatrix]) // eslint-disable-line

  useEffect(() => {
    const minMatrixX = getMinMatrixX();
    setMarkedX(minMatrixX);

    const _matrix3 = subMatrixX(minMatrixX);
    setMatrix3(markZeroToRed(_matrix3));
    setTimeout(() => {
      setLoading(false);
      if(_matrix3.length > 0) {
        onResult(copyMatrix(_matrix3));
      }
    }, 100)
  }, [matrix2]) // eslint-disable-line

  const subMatrixY = useCallback((minMatrixY) => {
    const matrix2 = copyMatrix(matrix);
    for (let y = 0; y < matrix2.length; y++) {
      for (let x = 0; x < matrix2[0].length; x++) {
        const value = matrix2[y][x].value;
        const min = minMatrixY[0][x].value;
        matrix2[y][x] = { ...matrix2[y][x], value: value - min };
      }
    }
    return matrix2;
  }, [matrix])

  const subMatrixX = useCallback((minMatrixX) => {
    const matrix3 = copyMatrix(matrix2);
    for (let y = 0; y < matrix3.length; y++) {
      for (let x = 0; x < matrix3[0].length; x++) {
        const value = matrix3[y][x].value;
        const min = minMatrixX[0][y].value;
        matrix3[y][x] = { ...matrix3[y][x], value: value - min };
      }
    }
    return matrix3;
  }, [matrix2])

  const getMinMatrixY = useCallback(() => {
    const width = matrix[0].length
    const minMatrixY = createMatrix(width, 1, { value: 0, style: { color: 'red' } })
      .map((line) => line.map((cell, x) => {
        const cols = getColMatrix(matrix, x).map(c => +c.value);
        return { ...cell, value: Math.min(...cols) }
      }));
    return minMatrixY;
  }, [matrix])

  const getMinMatrixX = useCallback(() => {
    const heigth = matrix2.length
    const minMatrixX = createMatrix(heigth, 1, { value: 0, style: { color: 'red' } })
      .map((line) => line.map((cell, x) => {
        const rows = getRowMatrix(matrix2, x).map(c => +c.value);
        return { ...cell, value: Math.min(...rows) }
      }));
    return minMatrixX;
  }, [matrix2])

  return (
    <div>
      <h2>1ère Etape</h2>
      <div className="steps">
        {loading && <div style={{ fontSize: 18 }}>Loading...</div>}
        {!loading && <>
          <Table
            matrix={matrix}
            labelX={labelX}
            labelY={labelY}
            markedY={markedY}
            readOnly
          />
          <Table
            matrix={matrix2}
            labelX={labelX}
            labelY={labelY}
            markedX={markedX}
            readOnly
          />
          <Table
            matrix={matrix3}
            labelX={labelX}
            labelY={labelY}
            readOnly
          />
          {markedX?.length > 0 && markedY?.length > 0 && <div style={{ alignSelf: 'center', marginLeft: 48, fontSize: 13, fontWeight: 'bold' }}>
            Coût minimal {'>='} { getTotalMatrix(markedX) + getTotalMatrix(markedY) }
            </div>}
        </>}
      </div>
    </div>
  )
}

export default Step1
