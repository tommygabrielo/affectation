import { useEffect, useState } from 'react'
import { copyMatrix } from '../../../utils/matrix';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

const countMarkCellPerLine = (matrix) => {
  let count = 0;
  for (let y = 0; y < matrix.length; y++) {
    const line = matrix[y];
    count += line.filter(cell => cell.marked).length > 0 ? 1 : 0;
  }
  return count;
}

const Step234 = ({ sourceMatrix, labelX, labelY, step = 0, hidden = false, onResult = () => {}}) => {
  const [matrix2, setMatrix2] = useState([]);
  const [matrix3, setMatrix3] = useState([]);
  const [matrix4, setMatrix4] = useState([]);
  const [min, setMin] = useState(0);
  const [finished, setFinished] = useState(false);
  const [interStep, setInternStep] = useState(2);

  useEffect(() => {
    setMatrix2(copyMatrix(sourceMatrix));
  }, [sourceMatrix])

  const onStep2Finish = (outMatrix) => {
    const markedLines = countMarkCellPerLine(outMatrix);
    if (markedLines === outMatrix.length) {
      setFinished(true);
      onResult(outMatrix, true);
    } else {
      setMatrix3(outMatrix);
      setInternStep(3);
    }
  }

  const onStep3Finish = (outMatrix, min) => {
    setMatrix4(outMatrix);
    setMin(min);
    setInternStep(4);
  }

  const onStep4Finish = (outMatrix) => {
      onResult(outMatrix, false);
  }

  return (
    <div className="steps" style={{ visibility: hidden ? 'hidden' : 'visible' }}>
          {(interStep >= 2 && matrix2.length > 0) && <Step2
            sourceMatrix={matrix2}
            labelX={labelX}
            labelY={labelY}
            hidden={step < 2}
            onResult={onStep2Finish}
          />}
          {(!finished && interStep >= 3 && matrix3.length > 0) && <Step3
            sourceMatrix={matrix3}
            labelX={labelX}
            labelY={labelY}
            hidden={step < 3 || finished}
            onResult={onStep3Finish}
          />}
          {(!finished && interStep >= 4 && matrix4.length > 0) && <Step4
            sourceMatrix={matrix4}
            labelX={labelX}
            labelY={labelY}
            hidden={step < 4 || finished}
            min={min}
            onResult={onStep4Finish}
          />}
    </div>
  )
}

export default Step234
