import "../Outputs.scss";

const Graph = ({ title = 'Resultat', sum, affecations, labelX, labelY }) => {
  return (
    <div style={{ width: 300 }}>
      <h2 style={{ textAlign: 'center' }}>{title}</h2>
      <svg version="1.2" className="graph" aria-labelledby="title" role="img" width={300} height={affecations.length * 45}>
        <g>
          <title>Source</title>
          {affecations.map((_,index) => (
            <g key={index}>
              <circle cx="50" cy={20 + 45 * index} r="15" stroke="black" strokeWidth="2" fill="white" />
              <text fill="gray" fontSize="18" x="44" y={27 + 45 * index}>{labelY[index]}</text>
            </g>
          ))}
        </g>

        <g>
          <title>Destination</title>
          {affecations.map((_,index) => (
            <g key={index}>
              <circle cx="250" cy={20 + 45 * index} r="15" stroke="black" strokeWidth="2" fill="white" />
              <text fill="gray" fontSize="18" x="244" y={27 + 45 * index}>{labelX[index]}</text>
            </g>
          ))}
        </g>

        <g>
          <title>Affectation</title>
          {affecations.map((aff, index) => (
            <g className="svg-path" key={index}>
              <path
                id={`path-${index}`}
                d={`M 65 ${20 + aff.from * 45 } l 170 ${(aff.to-aff.from)*45}`}
                opacity={4}
                stroke="black" strokeWidth="3" fill="none" />
              <text fill="red" fontSize="15" fontWeight="500" x="80" y="20">
                <textPath xlinkHref={`#path-${index}`}
                  startOffset={`${aff.to-aff.from < 0 ? `${40+(aff.from-aff.to)*2}%` : `-${39-(aff.to-aff.from)*2}%` }`}
                  alignmentBaseline="after-edge">
                  {aff.value}
                </textPath>
              </text>
            </g>
          ))}
        </g>
      </svg>
      <div style={{ textAlign: 'center', fontWeight: 500, fontSize: 15, color: 'red' }}> = {sum}</div>
    </div>
  )
}

export default Graph
