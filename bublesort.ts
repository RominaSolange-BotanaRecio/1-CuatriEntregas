//toma un arreglo de números y lo ordena en orden descendente
//utiliza metodo interativo donde los elementos se comparan e intercambian

function arregloDescendente(arr: number[]): number[] { //funcion de arreglo
    let n = arr.length;     
//indica bucle que comienza en i=0 y continua mientras i sea menor  
//que n-1 cada vez que el bucle se ejecut, i se incrementa en 1 (i++)
     for (let i = 0; i < n - 1; i++) {     
//indica otor bucle para ordenamiento de burbuja
//
        for (let j = 0; j < n - i - 1; j++) { 
            //se corrobora  lo actual en la siguiente posición
            if (arr[j] < arr[j + 1]) {
            // Intercambiamos elementos de orden
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; 
            }
        }
    }
// devuelve el arreglo de números 
    return arr;
}
//funcion que toma un arreglo y devuelve el mismo en descendente
let miArreglo = [10, 25, 12, 105, 556, 68]; 
let arregloOrdenado = arregloDescendente(miArreglo); 

console.log("Arreglo orden descendente:", arregloOrdenado);
