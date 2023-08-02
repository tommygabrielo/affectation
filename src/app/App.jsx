import { copyMatrix, createLabel, createMatrix, randomFillMatrix } from './utils/matrix';
import { useEffect, useRef, useState } from 'react';
import Table from './components/Table/Table';
import Outputs from './components/Outputs/Outputs';
import './App.scss';

const App = () => {
  const [dim, setDim] = useState(6);
  const [labelX, setLabelX] = useState(createLabel(dim));
  const [labelY, setLabelY] = useState(createLabel(dim, false));
  const [matrix, setMatrix] = useState(createMatrix(dim, dim));
  const outputsRef = useRef();
  const [minMaxState, setMinMaxState] = useState('min');

  useEffect(() => {
    setLabelX(createLabel(dim))
    setLabelY(createLabel(dim, false))
    setMatrix(createMatrix(dim, dim))
  }, [dim])

  const onFillRandom = () => {
    setMatrix(randomFillMatrix(matrix));
  }

  const onValueChange = ({ x, y }, value) => {
    if (value === '' || (!isNaN(parseInt(value)) && +value > -1 && +value < 100)) {
      matrix[y][x] = { ...matrix[y][x], value };
      setMatrix([...matrix]);
    }
  }

  const onMinMaxChange = (event) => {
    setMinMaxState(event.target?.value || 'min')
    setMatrix(copyMatrix(matrix));
  }

  return (
    <div className="app">
      <body>
        <nav>
          <div class="navbar">
            <div class="navbar-left">
              <a href="#" class="navbar-item">AFFECTATION OPTIMALE</a>
            </div>
            <div class="navbar-right">
              <div className='navbar-item'>
                <label>Dimension:    </label>
                <input type="number" value={dim} onChange={(e) => setDim(e.target.value)} min={2} max={9} />
              </div>

              <div className='navbar-item'>
                <button onClick={onFillRandom} className='btn btn-primary'>Aléatoire</button>
              </div>

              <div className='navbar-item' >
                <input
                  style={{ marginLeft: 10 }}
                  checked={minMaxState === 'min'}
                  onChange={onMinMaxChange}
                  type="radio" value="min" name="type" id="radio-min" />
                <label style={{ marginLeft: 4 }} htmlFor='radio-min'>Min</label>
                <input
                  style={{ marginLeft: 10 }}
                  onChange={onMinMaxChange}
                  checked={minMaxState === 'max'}
                  type="radio" value="max" name="type" id="radio-max" />
                <label style={{ marginLeft: 4 }} htmlFor='radio-max'>Max</label>
              </div>

            </div>
          </div>
        </nav>
        <main>

          <div className="sujet">
            <div className="inputs">
              <Table
                matrix={matrix}
                labelX={labelX}
                labelY={labelY}
                onValueChange={onValueChange}
              />
            </div>
          </div>

          <div className="outputs" ref={outputsRef}>
            <Outputs
              type={minMaxState}
              sourceMatrix={matrix}
              labelX={labelX}
              labelY={labelY}
              containerRef={outputsRef}
            />
          </div>

        </main>
      </body>


    </div>
  )
}

export default App
