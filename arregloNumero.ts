const numeros = [4, 7, 9, 3, 1, 45, 67, 23, 29, 78, 11, 16];

let maximo = numeros [0];
for (let i = 1; i < numeros.length; i++) {
    if (numeros [i] > maximo) {
        maximo = numeros[i];
    }
}

const resultado = maximo % 2 === 0 ? 'par' : 'impar';

console.log (`El número más grande es ${maximo} y es ${resultado}.`);