import { useEffect, useState } from 'react';
import { copyMatrix } from '../../../utils/matrix'
import Step234 from './Step234';

const DynamicStep234 = ({ sourceMatrix = [], labelX, labelY, step, onResult = () => { } }) => {
  const [matrix, setMatrix] = useState(copyMatrix(sourceMatrix));
  const [moreMatrix, setMoreMatrix] = useState({})

  useEffect(() => {
    setMatrix(copyMatrix(sourceMatrix));
    setMoreMatrix({});
  }, [sourceMatrix]);

  const onResultIntern = (index, outMatrix, finished) => {
    if (finished) {
      onResult(copyMatrix(outMatrix));
    } else {
      const _matrix = copyMatrix(outMatrix);
      setMoreMatrix({ ...moreMatrix, [index + 1]: _matrix });
    }
  }

  const RenderComponent = ({ index = 0, step, matrix, onResultIntern = () => { } }) => {
    const fixStep = (step) => {
      const value = step - index * 4;
      return value;
    }
    return <Step234
      sourceMatrix={matrix}
      labelX={labelX}
      labelY={labelY}
      step={fixStep(step)}
      onResult={onResultIntern}
    />
  }

  return <div>
    {
      RenderComponent({
        index: 0,
        step,
        matrix,
        onResultIntern: (outMatrix, finished) => onResultIntern(0, outMatrix, finished)
      })
    }
    <>
      {[...Array(20).keys()].map(i => (+i) + 1).map(index => {
        return <div key={index}>
          {
            (step >= (2 + index * 4) && moreMatrix[index]?.length > 0) && <>
              {
                RenderComponent({
                  index,
                  step,
                  matrix: moreMatrix[index],
                  onResultIntern: (outMatrix, finished) => onResultIntern(index, outMatrix, finished)
                })
              }
            </>
          }
        </div>
      })}
    </>
  </div>
}

export default DynamicStep234;