import './Table.scss';

const Table = ({
  matrix, labelX, labelY,
  readOnly = false,
  markedX = [], markedY = [],
  hidden = false,
  onValueChange = () => { }
}) => {

  return (
    <div className={`table ${hidden ? 'hidden' : ''}`}>
      {matrix && matrix.length > 0 && <>
        <div className="labelX">
          <div className="label"></div>
          {labelX.map(x => <div className="label" key={x}>{x}</div>)}
        </div>
        <div className="content-labelY" style={{ border:'none'}}>
          <div className="labelY">
            {labelY.map(y => <div className="label" key={y}>{y}</div>)}
          </div>
          <div className="matrix-container">
            {matrix.map((line, y) => (
              <div className="line" key={y}  style={{ padding:0}}>
                {line.map((cell, x) => (
                  <div className={`cell ${cell.crossed ? 'crossed' : ''} ${cell.framed ? 'framed' : ''} ${cell.marked ? 'marked' : ''}`}
                    style={cell?.style}
                    key={x}>
                    <input
                      readOnly={readOnly}
                      style={cell?.style}
                      type="text"
                      className="input-cell"
                      value={cell?.value !== null ? cell.value : 0}
                      onChange={({ target }) => onValueChange({ x, y }, target.value)}
                      onBlur={({ target }) => onValueChange({ x, y }, target.value !== '' ? +target.value : 0)}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="markedX" >
            {markedX && markedX.map((line, y) => (
              <div className="line" key={y}>
                {line && line.map((cell, x) => (
                  <div className="cell" key={x} style={cell?.style}>
                    <span style={cell?.style}>{cell.value}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="markedY" style={{ border:'none'}}>
          {markedY && markedY.map((line, y) => (
            <div className="line" key={y}>
              <div className="cell" />
              {line && line.map((cell, x) => (
                <div className="cell" key={x}>
                  <span style={cell?.style}>{cell.value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </>}
    </div>
  )
}

export default Table
