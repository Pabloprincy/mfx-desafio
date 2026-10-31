const matrix = [
    [10, 20, 30],
    [40, 50, 60]
];

let resultado = [];

    for (let i = 0; i < matrix.length; i++) {

        let soma = 0;

        for (let j = 0; j < matrix[i].length; j++) {
            console.log(soma ,"===",matrix[i][j])

            // Aqui você acumula os números.
            soma  = soma+  matrix[i][j]
           console.log(soma,"valor")

        }
    
           resultado.push(soma)
    }
        console.log(resultado)