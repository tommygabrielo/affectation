import { useEffect, useState } from 'react';
import { copyMatrix, swapMatrix } from '../../utils/matrix'
import Step1 from './components/Step1';
import DynamicStep234 from './components/DynamicStep234';
import './Outputs.scss';
import Graph from './components/Graph';

const getAffecationResult = (originMatrix, resultMatrix) => {
  let affectations = []
  let sum = 0;
  for (let y = 0; y < originMatrix.length; y++) {
    for (let x = 0; x < originMatrix[0].length; x++) {
      if (resultMatrix[y][x]?.marked) {
        affectations.push({ from: y, to: x, value: originMatrix[y][x].value });
        sum += +originMatrix[y][x].value;
      }
    }
  }
  return [sum, affectations];
}

const Outputs = ({ sourceMatrix = [], labelX, labelY, containerRef = {}, type }) => {
  const [matrix1, setMatrix1] = useState(copyMatrix(sourceMatrix));
  const [matrix1Max, setMatrix1Max] = useState(swapMatrix(sourceMatrix));
  const [matrix2, setMatrix2] = useState([]);
  const [finished, setFinished] = useState(false);
  const [step, setStep] = useState(0);

  const [minAffecations, setMinAffecations] = useState([]);
  const [minSum, setMinSum] = useState(0);

 // const [maxAffecations, setMaxAffecations] = useState([]);
 // const [maxSum, setMaxSum] = useState(0);

  useEffect(() => {
    setMatrix1(copyMatrix(sourceMatrix));
    setMatrix1Max(swapMatrix(sourceMatrix));
    setStep(0);
    setFinished(false);
  }, [sourceMatrix])

  const scrollBottom = (timeout = 200) => {
    setTimeout(() => {
      if (containerRef?.current) {
        const element = containerRef.current;
        element.scrollTop = element.offsetHeight + 5000;
      }
    }, timeout)
  }

  const onCalculate = () => {
    const totalNumberOfSteps = 10; // Remplacez cette valeur par le nombre total d'étapes à exécuter
    const delayBetweenSteps = 1000; // Remplacez cette valeur par le délai souhaité entre les étapes (en millisecondes)
  
    // Fonction pour effectuer une étape spécifique
    const performStep = (currentStep) => {
      // Mettez ici la logique pour effectuer une étape spécifique
      // Par exemple, basculez entre les étapes à l'aide de la variable 'currentStep'
      if (currentStep === 1) {
        // Effectuez l'étape 1
        // setMatrix1(// Mettez à jour la matrice pour l'étape 1);
      } else if (currentStep === 2) {
        // Effectuez l'étape 2
        // setMatrix2(// Mettez à jour la matrice pour l'étape 2);
      }
      // Et ainsi de suite pour toutes les étapes...
    };
  
    // Fonction pour exécuter toutes les étapes en utilisant une boucle for
    const runAllSteps = async () => {
      for (let currentStep = 1; currentStep <= totalNumberOfSteps; currentStep++) {
        await new Promise(resolve => setTimeout(resolve, delayBetweenSteps)); // Attendre le délai entre les étapes
        performStep(currentStep); // Effectuer l'étape
        setStep(currentStep); // Mettre à jour le compteur d'étapes après avoir effectué une étape
      }
      // Toutes les étapes sont terminées
      setFinished(true);
    };
  
    // Commencer à exécuter toutes les étapes
    runAllSteps();
    scrollBottom();
  };
  

  const onStep1Finish = (outMatrix) => {
    setMatrix2(outMatrix);
  }

  const onStep234Finish = (outMatrix) => {
    setFinished(true);
    const [sum, affectations] = getAffecationResult(sourceMatrix, outMatrix);
    setMinAffecations(affectations);
    setMinSum(sum);
    // setMaxAffecations(affectations.map(v => { return { ...v, value: 100 - (+v.value) } }))
    // setMaxSum(600 - sum);
  }

  return (
    <div className="outputs-container">
      <div className="header">
        <button onClick={onCalculate} className='btn btn-primary'>Calculer</button>
      </div>
      <div className="content">
        {step >= 1 && <Step1
          sourceMatrix={type === 'min' ?  matrix1 : matrix1Max}
          labelX={labelX}
          labelY={labelY}
          onResult={onStep1Finish}
        />}
        {step >= 2 && <DynamicStep234
          sourceMatrix={matrix2}
          labelX={labelX}
          labelY={labelY}
          step={step}
          onResult={onStep234Finish}
        />}
        {finished &&
          <div className="graph-container">
            {type === 'min' && minAffecations.length > 0 && (
              <Graph
                title="Minimale"
                affecations={minAffecations}
                sum={minSum}
                labelX={labelX}
                labelY={labelY}
              />)}
            {type === 'max' && minAffecations.length > 0 && (
              <Graph
                title="Maximale"
                affecations={minAffecations}
                sum={minSum}
                labelX={labelX}
                labelY={labelY}
              />)}
          </div>
        }
      </div>
    </div>
  )
}

export default Outputs
