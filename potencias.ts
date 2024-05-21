const base: number = 3;

const exponente: number = 4;


let resultado: number;

if (exponente < 0) {
    console.log('El exponente debe ser mayor o igual a cero.');
}   else {
    resultado = base ** exponente;
    console.log( `El resultado es: ${resultado}`);
}