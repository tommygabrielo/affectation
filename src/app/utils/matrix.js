import _ from "lodash";

export const createLabel = (size, isLower = true) => {
  const labels = 'abcdefghijklmnlopqrstuvwxyz';
  const sub = labels.substr(0, size);
  return isLower ? sub.split('').map((_, key) => key + 1) : sub.toUpperCase().split('');
}

export const createMatrix = (w = 3, h = 3, initial = { value: null, crossed: false, framed: false, marked: false }) => {
  let matrix = [];
  for (let y = 0; y < h; y++) {
    matrix.push([]);
    for (let x = 0; x < w; x++) {
      matrix[y].push({ ...initial })
    }
  }
  return matrix;
}

export const markZeroToRed = (inMatrix) => {
  const matrix = copyMatrix(inMatrix);
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      const value = matrix[y][x].value;
      matrix[y][x] = { ...matrix[y][x], style: +value === 0 ? { color: 'red', fontWeight: 'bold' } : null };
    }
  }
  return matrix;
}

export const getColMatrix = (matrix, col) => {
  const cols = []
  for (let y = 0; y < matrix.length; y++) {
    cols.push(matrix[y][col]);
  }
  return cols;
}

export const getRowMatrix = (matrix, row) => {
  return matrix[row];
}

export const getTotalMatrix = (matrix) => {
  let sum = 0;
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      sum += +matrix[y][x].value;
    }
  }
  return sum;
}

export const copyMatrix = (matrix) => {
  const newMatrix = [];
  for (let i = 0; i < matrix.length; i++) {
    newMatrix[i] = matrix[i].slice();
  }

  return _.cloneDeep(newMatrix);
}

export const copyValueFrom = (inMatrix, outMatrix) => {
  const matrix = copyMatrix(inMatrix);
  for (let y = 0; y < inMatrix.length; y++) {
    for (let x = 0; x < inMatrix[y].length; x++) {
      matrix[y][x] = { ...matrix[y][x], value: +outMatrix[y][x] };
    }
  }
  return matrix;
}

export const resetMarkMatrix = (inMatrix) => {
  const matrix = copyMatrix(inMatrix);
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      matrix[y][x] = { ...matrix[y][x], crossed: false, framed: false, marked: false, style: null }
    }
  }
  return matrix;
}

export const randomFillMatrix = (matrix) => {
  const _matrix = copyMatrix(matrix)
  for (let y = 0; y < _matrix.length; y++) {
    for (let x = 0; x < _matrix[y].length; x++) {
      _matrix[y][x] = { ..._matrix[y][x], value: parseInt(Math.random() * 100) }
    }
  }
  return _matrix;
}

export const mapMatrixToValueMatrix = (matrix) => {
  let valueMatrix = [];
  for (let y = 0; y < matrix.length; y++) {
    valueMatrix.push([]);
    for (let x = 0; x < matrix[y].length; x++) {
      valueMatrix[y][x] = matrix[y][x].value;
    }
  }
  return valueMatrix;
}

export const mapValueMatrixToMatrix = (valueMatrix) => {
  let matrix = [];
  for (let y = 0; y < valueMatrix.length; y++) {
    matrix.push([]);
    for (let x = 0; x < valueMatrix[y].length; x++) {
      matrix[y][x] = { value: valueMatrix[y][x], crossed: false, framed: false, marked: false, style: null };
    }
  }
  return matrix;
}

export const swapMatrix = (matrix) => {
  const newMatrix = copyMatrix(matrix);
  for (let j = 0; j < matrix.length; j++) {
    for (let i = 0; i < matrix.length; i++) {
      newMatrix[i][j].value = Math.abs(100 - matrix[i][j].value);
    }
  }
  return newMatrix;
}
