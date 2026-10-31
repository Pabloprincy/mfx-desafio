

function processMatrix(matrix) {
    const sumRows = [];
    const sumColumns = [];

    // Soma das linhas
    for (let i = 0; i < matrix.length; i++) {
        let sum = 0;

        for (let j = 0; j < matrix[i].length; j++) {
            sum += matrix[i][j];
        }

        sumRows.push(sum);
    }

    // Soma das colunas
    for (let j = 0; j < matrix[0].length; j++) {
        let sum = 0;

        for (let i = 0; i < matrix.length; i++) {
            sum += matrix[i][j];
        }

        sumColumns.push(sum);
    }

    let diagonalPrincipal = 0;
    let diagonalSecundaria = 0;

    // Diagonais: somente para matrizes quadradas
    if (matrix.length === matrix[0].length) {
        for (let i = 0; i < matrix.length; i++) {
            diagonalPrincipal += matrix[i][i];

            diagonalSecundaria += matrix[i][matrix.length - 1 - i];
        }
    }
   
    return {
        sumRows,
        sumColumns,
        diagonalPrincipal,
        diagonalSecundaria
    };
}
const matrix = [
    [3, 5, 7],
    [2, 4, 6],
    [1, 8, 9]
];

const resultado = processMatrix(matrix);

console.log(resultado);
